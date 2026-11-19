import { Component, EventEmitter, Input, OnInit, Output, PipeTransform, SimpleChanges, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { MediaFile } from '../../../../core/interfaces/mediafiles/media-file.model';
import { MediaType } from '../../../../core/enums/media-type';
import { DatePipe, SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AudioService } from '../../../../core/api/services/audio.service';
import { ImageService } from '../../../../core/api/services/image.service';
import { VideoService } from '../../../../core/api/services/video.service';
import { EbookService } from '../../../../core/api/services/ebook.service';
import { NgbDropdownModule, NgbHighlight, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Folder } from '../../../../core/interfaces/folders/folder.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddMediaToFolderComponent } from '../add-media-to-folder/add-media-to-folder.component';

@Component({
  selector: 'app-media-files-table',
  imports: [DatePipe, RouterLink, RouterLinkActive, SlicePipe, 
    NgbPaginationModule, AddMediaToFolderComponent, ReactiveFormsModule, 
    NgbHighlight, NgbDropdownModule],
  templateUrl: './media-files-table.component.html',
  styleUrls: ['./media-files-table.component.css']
})
export class MediaFilesTableComponent{
  @Input() tablemediaFiles: MediaFile[] = [];
  @Input() folderList: Folder[] = [];
  @Output() refreshMediaFilesTable = new EventEmitter<boolean>();
  mediaTypes = MediaType;

  page: number = 1;
  pageSize: number = 5;

  filter = new FormControl('', { nonNullable: true });
  filteredMediaFiles: MediaFile[] = [];
  selectedMediaType?: MediaType;

  constructor(private audioService: AudioService,
              private imageService: ImageService,
              private videoService: VideoService,
              private ebookService: EbookService,
              private modalService: NgbModal,
  ) { 
    this.filter.valueChanges.subscribe(text => { 
      this.applyFilter();
    });
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tablemediaFiles']) {
      this.filteredMediaFiles = this.tablemediaFiles;
      this.applyFilter();
    }
  }

  deleteMediaFile(id: number, mediaTypeToDelete: MediaType): void{
    if(mediaTypeToDelete === this.mediaTypes.Audio){
      this.audioService.deleteAudio(id).subscribe(response => this.refreshMediaFiles());
    }
    else if (mediaTypeToDelete === this.mediaTypes.Image){
      this.imageService.deleteImage(id).subscribe(response => this.refreshMediaFiles());
    }
    else if (mediaTypeToDelete === this.mediaTypes.Video){
      this.videoService.deleteVideo(id).subscribe(response => this.refreshMediaFiles());
    }
    else if (mediaTypeToDelete === this.mediaTypes.Ebook){
      this.ebookService.deleteEbook(id).subscribe(response => this.refreshMediaFiles());
    }
  }

  refreshMediaFiles(){
    this.refreshMediaFilesTable.emit();
  }

  open(content: TemplateRef<any>, id: number, mediaType: MediaType) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then( result =>{
        if(result === "Save click"){
          this.deleteMediaFile(id, mediaType);
        }
      }
		);
	}

  search(text: string): MediaFile[] {
    const term = text.trim().toLowerCase();

    return this.tablemediaFiles.filter(mediaFile => {
      const matchesType =
        this.selectedMediaType === undefined ||
        mediaFile.mediaType === this.selectedMediaType;

      const matchesText =
        (mediaFile.title ?? '').toLowerCase().includes(term) ||
        (mediaFile.author ?? '').toLowerCase().includes(term) ||
        (mediaFile.categoryName ?? '').toLowerCase().includes(term);

      return matchesType && matchesText;
    });
  }

  setMediaTypeFilter(mediaType: MediaType) {
    this.selectedMediaType = mediaType;
    this.applyFilter();
  }

  clearMediaTypeFilter() {
    this.selectedMediaType = undefined; 
    this.applyFilter(); 
  }

  applyFilter(): void {
    this.filteredMediaFiles = this.sortFiles(this.search(this.filter.value));

    this.page = 1;
    this.findDuplicatePairs();
  }

  getMediaTypeName(mediaType: number): string {
    return MediaType[mediaType];
  }

  get mediaSummary() {
    const files = this.filteredMediaFiles;

    return {
      total: files.length,
      audios: files.filter(f => f.mediaType === MediaType.Audio).length,
      videos: files.filter(f => f.mediaType === MediaType.Video).length,
      images: files.filter(f => f.mediaType === MediaType.Image).length,
      ebooks: files.filter(f => f.mediaType === MediaType.Ebook).length,
      duration: files
        .filter(f =>
          f.mediaType === MediaType.Audio ||
          f.mediaType === MediaType.Video)
        .reduce((sum, f) => sum + (Number(f.duration) || 0), 0)
    };
  }

  exportReport(): void {
    const rows: (string | number)[][] = [
      [
        'Title',
        'Author or artist',
        'Media type',
        'Category',
        'Format',
        'Duration (seconds)',
        'Page count',
        'Resource URL'
      ],
      ...this.filteredMediaFiles.map(file => [
        file.title ?? '',
        file.author ?? '',
        this.getMediaTypeName(file.mediaType),
        file.categoryName ?? '',
        file.format ?? '',
        file.duration ?? '',
        file.pageCount ?? '',
        file.resourceUrl ?? ''
      ])
    ];

    const escapeCell = (value: string | number): string => {
      let text = String(value);

      // Текстові значення не повинні виконуватися як формули Excel.
      if (typeof value === 'string' && /^\s*[=+\-@]/.test(text)) {
        text = "'" + text;
      }

      return '"' + text.replace(/"/g, '""') + '"';
    };

    const csv = '\uFEFF' + rows.map(row => row.map(escapeCell).join(';')).join('\r\n');
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'media-library-report.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  duplicatePairs: {
    first: MediaFile;
    second: MediaFile;
    score: number;
    reason: string;
  }[] = [];

  private normalizeText(value: string | null | undefined): string {
    return (value ?? '').normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  // Подібність текстів від 0 до 1 на основі відстані Левенштейна.
  private textSimilarity(first: string, second: string): number {
    if (!first || !second) {
      return 0;
    }

    if (first === second) {
      return 1;
    }

    // Для коротких слів навіть одна відмінність може бути суттєвою.
    if (Math.min(first.length, second.length) <= 4) {
      return 0;
    }

    let previous = Array.from({ length: second.length + 1 }, (_, index) => index);

    for (let i = 1; i <= first.length; i++) {
      const current: number[] = [i];

      for (let j = 1; j <= second.length; j++) {
        const replacementCost = first[i - 1] === second[j - 1] ? 0 : 1;
        current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + replacementCost);
      }
      previous = current;
    }

    const distance = previous[second.length];
    return 1 - distance / Math.max(first.length, second.length);
  }

  private findDuplicatePairs(): void {
    this.duplicatePairs = [];

    const files = this.filteredMediaFiles.map(file => ({
      file,
      title: this.normalizeText(file.title),
      author: this.normalizeText(file.author)
    }));

    for (let i = 0; i < files.length; i++) {
      for (let j = i + 1; j < files.length; j++) {
        const first = files[i];
        const second = files[j];

        // Порівнюємо лише різні записи одного типу.
        if (
          first.file.mediaType !== second.file.mediaType ||
          first.file.id === second.file.id
        ) {
          continue;
        }

        const titleSimilarity = this.textSimilarity(first.title, second.title);
        const authorSimilarity = this.textSimilarity(first.author, second.author);

        if (titleSimilarity < 0.85 || authorSimilarity < 0.85) {
          continue;
        }

        let characteristicSimilarity = 1;
        let characteristicReason = '';

        const mediaType = first.file.mediaType;

        if ( mediaType === MediaType.Audio || mediaType === MediaType.Video || mediaType === MediaType.Ebook ) {
          const isEbook = mediaType === MediaType.Ebook;
          const firstValue = Number(isEbook ? first.file.pageCount : first.file.duration);
          const secondValue = Number(isEbook ? second.file.pageCount : second.file.duration);

          // Відсутні характеристики не вважаємо підтвердженням збігу.
          if (!Number.isFinite(firstValue) || !Number.isFinite(secondValue) || firstValue <= 0 || secondValue <= 0) {
            continue;
          }

          characteristicSimilarity = 1 - Math.abs(firstValue - secondValue) / Math.max(firstValue, secondValue);

          // Для книг допускаємо різницю до 2%, для тривалості — до 5%.
          const minimumSimilarity = isEbook ? 0.98 : 0.95;

          if (characteristicSimilarity < minimumSimilarity) {
            continue;
          }

          characteristicReason = isEbook ? `Pages: ${firstValue} / ${secondValue}` : `Duration: ${firstValue} / ${secondValue} seconds`;
        }

        // Для зображень доступні лише назва й автор.
        const score = mediaType === MediaType.Image
          ? (0.6 * titleSimilarity + 0.4 * authorSimilarity)
          : (0.5 * titleSimilarity + 0.3 * authorSimilarity + 0.2 * characteristicSimilarity);

        const reasons = [`Title similarity: ${Math.round(titleSimilarity * 100)}%`, `Author similarity: ${Math.round(authorSimilarity * 100)}%`
        ];

        if (characteristicReason) {
          reasons.push(characteristicReason);
        }

        this.duplicatePairs.push({
          first: first.file,
          second: second.file,
          score: Math.round(score * 100),
          reason: reasons.join('. ')
        });
      }
    }

    this.duplicatePairs.sort((a, b) => b.score - a.score || a.first.id - b.first.id || a.second.id - b.second.id);
  }

  openDuplicates(content: TemplateRef<any>): void {
    this.modalService.open(content, {
      size: 'lg',
      centered: true,
      scrollable: true,
      ariaLabelledBy: 'duplicates-modal-title'
    });
  }

  sortBy: string = 'titleAsc';

  setSort(value: string): void {
    this.sortBy = value;
    this.applyFilter();
  }

  private sortFiles(files: MediaFile[]): MediaFile[] {
    return [...files].sort((a, b) => {
      switch (this.sortBy) {
        case 'titleDesc':
          return (b.title ?? '').localeCompare(a.title ?? '');

        case 'authorAsc':
          return (a.author ?? '').localeCompare(b.author ?? '');

        case 'dateDesc':
          return new Date(b.uploadDate).getTime()
            - new Date(a.uploadDate).getTime();

        case 'dateAsc':
          return new Date(a.uploadDate).getTime()
            - new Date(b.uploadDate).getTime();

        default:
          return (a.title ?? '').localeCompare(b.title ?? '');
      }
    });
  }
}


