# CIO Umbraco Demo

A modern Umbraco CMS project built with .NET 10.

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional - only needed for SQL Server)
- A code editor (Visual Studio 2022, VS Code, or JetBrains Rider)

## Database Options

This project supports two database options:

### Option 1: SQLite (Default - No Setup Required)

SQLite is the default database and requires no additional setup. The database file is created automatically in the `App_Data` directory when you run the application.

**Pros:**
- ✅ Zero configuration
- ✅ No additional software required
- ✅ Great for development and testing
- ✅ Portable database file

**Cons:**
- ❌ Not recommended for production
- ❌ Limited concurrent users
- ❌ Basic performance

**To use SQLite**, ensure your `appsettings.json` has:
```json
"ConnectionStrings": {
  "umbracoDbDSN": "Data Source=|DataDirectory|/CIO-Umbraco.sqlite.db;Cache=Shared;Foreign Keys=True;Pooling=True",
  "umbracoDbDSN_ProviderName": "Microsoft.Data.Sqlite"
}
```

### Option 2: SQL Server 2019 (Recommended for Production-like Development)

Use the included Docker Compose configuration to run SQL Server 2019 locally.

**Pros:**
- ✅ Production-ready database
- ✅ Better performance
- ✅ Full SQL Server features
- ✅ Easy to set up with Docker

**Cons:**
- ❌ Requires Docker Desktop
- ❌ Uses more system resources

#### Setting Up SQL Server with Docker

1. **Start SQL Server container:**
   ```bash
   docker-compose up -d
   ```

2. **Update `appsettings.json`** to use SQL Server:
   ```json
   "ConnectionStrings": {
     "umbracoDbDSN": "Server=localhost,1433;Database=CIO-Umbraco;User Id=sa;Password=P@ssword1234;TrustServerCertificate=True;",
     "umbracoDbDSN_ProviderName": "Microsoft.Data.SqlClient"
   }
   ```

3. **Stop SQL Server container** (when done):
   ```bash
   docker-compose down
   ```

#### Managing SQL Server Container

```bash
# Start SQL Server
docker-compose up -d

# Stop SQL Server (keeps data)
docker-compose stop

# Stop SQL Server (removes container but keeps data in volume)
docker-compose down

# View SQL Server logs
docker-compose logs -f sqlserver

# Check container status
docker-compose ps

# Remove container AND data (⚠️ WARNING: deletes database!)
docker-compose down -v
```

#### Connection Details

- **Host**: `localhost`
- **Port**: `1433`
- **Database**: `CIO-Umbraco` (created automatically)
- **Username**: `sa`
- **Password**: `P@ssword1234` (change in `docker-compose.yml` for production)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Netcodr81/CIO-Umbraco-Demo.git
cd CIO-Umbraco-Demo
```

### 2. Choose Your Database

**For SQLite** (skip to step 3)

**For SQL Server:**
```bash
docker-compose up -d
```

### 3. Run the Application

```bash
cd src/CIO-Umbraco
dotnet run
```

Or use Visual Studio / Rider and press F5.

### 4. Access Umbraco

Open your browser and navigate to:
- **Frontend**: https://localhost:53029
- **Backoffice**: https://localhost:53029/umbraco

### 5. First-time Setup

On first run, Umbraco will:
1. Create the database (if using SQL Server)
2. Install the database schema
3. Import content from uSync (if `ImportOnFirstBoot` is enabled)
4. Prompt you to create an admin user (if no users exist)

## Project Structure

```
CIO-Umbraco-Demo/
├── src/
│   └── CIO-Umbraco/              # Main Umbraco project
│       ├── Views/                 # Razor views and templates
│       │   └── Partials/
│       │       └── blockgrid/     # Block Grid components
│       ├── wwwroot/               # Static files (CSS, JS, images)
│       │   ├── css/               # Stylesheets
│       │   ├── scripts/           # JavaScript
│       │   └── icons/             # SVG icons
│       ├── umbraco/               # Umbraco generated models
│       ├── uSync/                 # uSync serialized content
│       └── appsettings.json       # Configuration
├── docker-compose.yml             # SQL Server container config
└── README.md                      # This file
```

## Development

### Switching Between Databases

You can switch between SQLite and SQL Server at any time:

1. **Stop the application**
2. **Update `appsettings.json`** with the desired connection string
3. **Start/Stop Docker** (if switching to/from SQL Server)
4. **Run the application**

> **Note**: Switching databases will require re-importing content. The database schemas are not automatically migrated.

### uSync Content Import

The project uses uSync to serialize and import content. On first boot, content is automatically imported from the `uSync` folder.

To manually trigger import:
1. Go to Umbraco Backoffice → Settings → uSync
2. Click "Import"

### Building for Production

```bash
dotnet publish -c Release -o ./publish
```

## Troubleshooting

### SQL Server Won't Start

**Check if port 1433 is already in use:**
```bash
netstat -ano | findstr :1433
```

**Change the port in `docker-compose.yml`:**
```yaml
ports:
  - "1434:1433"  # Use port 1434 instead
```

Then update your connection string:
```json
"umbracoDbDSN": "Server=localhost,1434;Database=CIO-Umbraco;..."
```

### Cannot Connect to SQL Server

1. Ensure Docker container is running: `docker ps`
2. Check SQL Server logs: `docker-compose logs sqlserver`
3. Verify connection string in `appsettings.json`
4. Ensure password in `docker-compose.yml` matches `appsettings.json`

### Emails Not Appearing in MailPit

1. Ensure MailPit container is running: `docker ps`
2. Check MailPit logs: `docker-compose logs mailpit`
3. Verify SMTP settings in `appsettings.json`
4. Access MailPit web UI: http://localhost:8025

### MailPit Port Conflict

If port 8025 or 1025 is already in use, change them in `docker-compose.yml`:

```yaml
ports:
  - "8026:8025"  # Web UI on different port
  - "1026:1025"  # SMTP on different port
```

Then update your SMTP configuration to use port 1026.

### SQLite Database Locked

Stop all running instances of the application and delete the `.sqlite.db-wal` and `.sqlite.db-shm` files in `App_Data`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license here]

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/Netcodr81/CIO-Umbraco-Demo/issues) page.
