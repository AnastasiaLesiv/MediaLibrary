# MediaLibrary

Інформаційна система керування особистою медіатекою: каталог аудіозаписів, відеозаписів, зображень та електронних книг.

Система зберігає **метадані та необов’язкові зовнішні посилання**. Завантаження й відтворення самих файлів не реалізовані.

## Можливості

- Реєстрація, вхід та редагування профілю.
- Створення, перегляд, редагування та видалення власних медіазаписів.
- Особисті папки з матеріалами різних типів, перейменування папок.
- Пошук за назвою, автором/виконавцем і категорією, фільтрація за типом та сортування.
- Статистика поточної вибірки та експорт CSV з усіх її сторінок.
- Пошук можливих дублікатів за метаданими: нормалізація тексту, відстань Левенштейна та порівняння тривалості/кількості сторінок.
- Перевірка належності медіазаписів і папок користувачеві.

Оцінка схожості не є перевіркою вмісту файлів. Рішення щодо можливих дублікатів приймає користувач; автоматичного видалення немає.

## Технології

| Частина | Технології |
| --- | --- |
| Backend | C#, ASP.NET Core, .NET 8, Entity Framework Core 9.0.0, Identity, JWT |
| База даних | Microsoft SQL Server |
| Frontend | Angular 19.1, TypeScript 5.7, Bootstrap, ng-bootstrap, ngx-toastr |

## Що потрібно встановити

- [.NET SDK 8](https://dotnet.microsoft.com/download/dotnet/8.0).
- [Node.js](https://nodejs.org/) **22.x, починаючи з 22.0.0**, та npm. Ця гілка сумісна з Angular 19.1; не використовуйте довільну новішу основну версію Node.js.
- Microsoft SQL Server або [Docker Desktop](https://www.docker.com/products/docker-desktop/) із Linux-контейнерами.
- SQL-клієнт, наприклад JetBrains Rider або SQL Server Management Studio, для виконання скриптів.
- Git і браузер.

Окремо встановлювати Angular CLI глобально не потрібно: `npm start` використовує версію із залежностей проєкту.

**Усі команди нижче призначені для PowerShell**, відкритого в корені репозиторію. Для backend і frontend потрібні два окремі термінали. SQL Server має працювати протягом усього використання застосунку.

## Перший запуск

### 1. Отримати проєкт

```powershell
git clone https://github.com/AnastasiaLesiv/MediaLibrary.git
cd MediaLibrary
```

Якщо проєкт уже є на комп’ютері, відкрийте PowerShell у його кореневій папці, де містяться `Backend` і `Frontend`.

### 2. Запустити SQL Server

Якщо SQL Server уже встановлений або контейнер уже існує, використовуйте його та перейдіть до кроку 3. Не потрібно створювати другий сервер.

Для нової локальної інсталяції через Docker спочатку запустіть Docker Desktop, а потім виконайте:

```powershell
$sqlPasswordSecure = Read-Host "Новий пароль SQL Server (sa)" -AsSecureString
$env:MSSQL_SA_PASSWORD = [System.Net.NetworkCredential]::new('', $sqlPasswordSecure).Password

docker run --name medialibrary-sql -e ACCEPT_EULA=Y -e MSSQL_PID=Developer -e MSSQL_SA_PASSWORD -p 127.0.0.1:1433:1433 -v medialibrary-sql-data:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2022-latest
```

Виберіть пароль SQL Server довжиною щонайменше 8 символів із великими й малими літерами, цифрами та спеціальним символом. Це пароль бази даних, а не пароль користувача вебзастосунку.

Перевірте готовність сервера:

```powershell
docker ps
docker logs medialibrary-sql --tail 40
```

Дочекайтеся повідомлення `SQL Server is now ready for client connections`. Дані зберігаються в окремому Docker volume `medialibrary-sql-data`.

### 3. Створити базу та її структуру

У SQL-клієнті підключіться до сервера:

| Параметр | Значення для контейнера вище |
| --- | --- |
| Server / Host | `localhost` |
| Port | `1433` |
| Authentication | SQL Server Authentication |
| User | `sa` |
| Password | Пароль, заданий на попередньому кроці |

Для локального контейнера може знадобитися параметр довіри до сертифіката сервера (`Trust server certificate`).

У консолі сервера створіть базу:

```sql
CREATE DATABASE [MediaLibrary];
```

Потім **виберіть базу `MediaLibrary`** і виконайте в ній файл:

`Backend/Media_library/Sql/01_CreateDatabase.sql`

Скрипт створює таблиці, ключі, індекси та історію міграцій. Він не містить `CREATE DATABASE` і не призначений для повторного виконання в уже заповненій базі. Для наявної налаштованої бази цей крок пропускається.

Під час звичайного запуску backend база автоматично не створюється, а міграції автоматично не застосовуються. Для першого запуску за цією інструкцією достатньо SQL-скрипту; додатково запускати міграції поверх нього не потрібно.

### 4. Налаштувати та запустити backend

У першому PowerShell-терміналі, відкритому в корені репозиторію, задайте локальне підключення. Якщо змінна пароля залишилася після кроку 2, повторно вводити її не потрібно:

```powershell
if (-not $env:MSSQL_SA_PASSWORD) {
    $sqlPasswordSecure = Read-Host "Пароль SQL Server (sa)" -AsSecureString
    $env:MSSQL_SA_PASSWORD = [System.Net.NetworkCredential]::new('', $sqlPasswordSecure).Password
}

$sqlConnection = [System.Data.SqlClient.SqlConnectionStringBuilder]::new()
$sqlConnection['Data Source'] = 'localhost,1433'
$sqlConnection['Initial Catalog'] = 'MediaLibrary'
$sqlConnection['User ID'] = 'sa'
$sqlConnection['Password'] = $env:MSSQL_SA_PASSWORD
$sqlConnection['TrustServerCertificate'] = $true
$env:ConnectionStrings__DefaultConnection = $sqlConnection.ConnectionString

$jwtBytes = New-Object byte[] 32
$jwtRandom = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$jwtRandom.GetBytes($jwtBytes)
$jwtRandom.Dispose()
$env:JwtOptions__Key = [Convert]::ToBase64String($jwtBytes)

dotnet restore Backend/Media_library/Media_library.csproj
dotnet run --project Backend/Media_library/Media_library.csproj --launch-profile http
```

Для іншого сервера змініть адресу, спосіб автентифікації й облікові дані у параметрах підключення.

Змінні середовища перекривають значення з `appsettings.json` і діють у поточному терміналі. Приклади не потребують записування особистого пароля чи JWT-ключа у файли репозиторію. `Issuer` і `Audience` беруться з конфігурації проєкту.

Адреси після запуску:

- API: <http://localhost:5204>
- Swagger: <http://localhost:5204/swagger>

Залиште термінал працювати. Оскільки для локального запуску вибрано HTTP-профіль, можливе попередження про невизначений HTTPS-порт перенаправлення. Спочатку перевірте доступність Swagger за адресою вище.

### 5. Запустити frontend

Відкрийте **другий** PowerShell-термінал у корені репозиторію:

```powershell
cd Frontend
npm ci
npm start
```

Відкрийте <http://localhost:4200>.

Використовуйте саме `localhost:4200`: ця адреса дозволена політикою CORS backend. Якщо запускати frontend на іншому порту або через `127.0.0.1`, налаштування CORS потрібно узгодити.

### 6. Зареєструвати користувача

На формі входу натисніть `Not registered yet?`, заповніть реєстраційні дані та створіть обліковий запис. Потім увійдіть через форму входу.

Пароль застосунку має містити щонайменше 6 символів, великі й малі літери, цифру та спеціальний символ. Підтвердження електронної адреси для локального запуску не потрібне.

Готового спільного облікового запису для входу немає. Спочатку нова медіатека порожня — це очікувана поведінка.

## Демонстраційні дані та SQL-запити

Наповнення необов’язкове: можна створювати записи через інтерфейс.

Для демонстраційного наповнення спочатку зареєструйте користувача, потім виконайте в SQL-клієнті:

```sql
SELECT Id, UserName, FullName
FROM dbo.AspNetUsers;
```

Скопіюйте `Id` потрібного користувача. У файлі `Backend/Media_library/Sql/02_DemoData.sql` замініть значення змінної `@UserId` на цей ідентифікатор та виконайте скрипт у базі `MediaLibrary`.

Ідентифікатор, записаний у файлі, належить авторській демонстраційній базі. У новій базі його потрібно замінити, інакше скрипт зупиниться з повідомленням про відсутнього користувача.

Скрипт додає відсутні категорії, 15 тематичних папок, по 15 записів кожного типу та зв’язки з папками. Повторний послідовний запуск перевіряє наявність цих демонстраційних записів через `NOT EXISTS`.

Після наповнення оновіть сторінку застосунку. Для перевірки 27 навчальних запитів використовуйте `Backend/Media_library/Sql/03_Queries.sql`, також підставивши власний `@UserId`. Результати залежать від фактичних даних бази.

Можливі дублікати з’являються лише тоді, коли в поточній вибірці є відповідні пари. Базовий скрипт наповнення не гарантує наявності дублікатів.

## Повторний запуск і зупинення

Якщо контейнер уже створений:

```powershell
docker start medialibrary-sql
```

Потім виконайте налаштування змінних backend із кроку 4 та його команду запуску. У другому терміналі:

```powershell
cd Frontend
npm start
```

Повторювати створення бази, запуск скрипту структури та `npm ci` не потрібно, якщо середовище й залежності не змінювалися. Після отримання змін залежностей виконайте `npm ci` повторно.

Для зупинення frontend і backend натисніть `Ctrl+C` у відповідних терміналах. Зупинення SQL Server:

```powershell
docker stop medialibrary-sql
```

Перегенерація JWT-ключа під час нового сеансу робить старі токени недійсними — у такому разі ввійдіть в застосунок повторно.

## Поширені проблеми

| Проблема | Що перевірити |
| --- | --- |
| `dotnet`, `node`, `npm` або `docker` не знайдено | Установіть відповідний інструмент і відкрийте новий термінал. |
| Контейнер `medialibrary-sql` уже існує | Використовуйте `docker start medialibrary-sql`, а не повторний `docker run`. |
| Порт 1433 зайнятий | Перевірте, чи вже працює SQL Server. Використайте наявний сервер або інший зовнішній порт, змінивши також підключення backend і SQL-клієнта. |
| Помилка входу `sa` | Пароль має збігатися з паролем, установленим під час першого створення сервера. Нова змінна середовища сама по собі його не змінює. |
| `Cannot open database` або `Invalid object name` | Перевірте створення `MediaLibrary`, виконання скрипту структури в ній і рядок підключення. |
| `ERR_CONNECTION_REFUSED` або помилка мережі | Перевірте, що backend працює на порту 5204, а SQL Server запущений. |
| CORS-помилка | Відкривайте frontend через `http://localhost:4200`. |
| Помилка версії Node.js | Використовуйте сумісну гілку Node.js 22.x; залежності встановлюйте через `npm ci`. |
| Порожній список матеріалів | Створіть записи вручну або виконайте наповнення для Id поточного користувача. |
| `Користувача не знайдено` у демонстраційному SQL | Спочатку зареєструйте користувача й замініть `@UserId` на його реальний Id. |

## Збирання

Із кореня репозиторію:

```powershell
dotnet build Backend/Media_library/Media_library.csproj
```

Із папки `Frontend`:

```powershell
npm run build
```

## Довідкові матеріали

- [Сумісність версій Angular і Node.js](https://angular.dev/reference/versions).
- [SQL Server у Docker](https://learn.microsoft.com/sql/linux/install-upgrade/quickstart-install-docker).
- [Конфігурація ASP.NET Core через змінні середовища](https://learn.microsoft.com/aspnet/core/fundamentals/configuration/).
