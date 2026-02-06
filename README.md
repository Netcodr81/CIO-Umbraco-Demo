
# CIO-Umbraco-Demo

A .NET 10 Umbraco CMS application.

## Prerequisites

Before getting started, ensure you have the following installed:

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (LocalDB, Express, or full version)
- A code editor such as [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Netcodr81/CIO-Umbraco-Demo.git
cd CIO-Umbraco-Demo
```

### 2. Configure Unattended Installation Settings

Navigate to the `src/CIO-Umbraco` folder and open the `appsettings.Development.json` file. Update the **UnattendedUserName**, **UnattendedUserEmail**, and **UnattendedUserPassword** in the Unattended section:

```json
 "Umbraco": {
    "CMS": {
      "Global": {
        "UseHttps": false
      },
      "Unattended": {
        "InstallUnattended": true,
        "UnattendedUserName": "Your name here",
        "UnattendedUserEmail": "your.email@example.com",
        "UnattendedUserPassword": "YourPasswordHere obviously don't use a password you use for anything important",
        "UnattendedTelemetryLevel": "Detailed"
      },
      "Content": {
        "MacroErrors": "Throw"
      },
      "Hosting": {
        "Debug": true
      }
    }
  }
```

> **Note:** This is a demo and by default uses SQLLite as it's database. You can updated it to use SQL Server if you want. Refer to [Umbracos documentation](https://docs.umbraco.com/umbraco-cms/reference/configuration/connectionstringssettings).

### 3. Build and Run the Application

```bash
cd src/CIO-Umbraco
dotnet restore
dotnet build
dotnet run (or dotnet watch for hot reload)
```

*Note VS Code Users*: If you have the C# Dev Kit installed you can launch the app using the Solution Explorer. To enable hot reload do the following:

1. Open the settings using `ctrl + shift + p`
2. Search for `hot reload`
3. Ensure `Experimental -> Debug -> Hot reload` option is checked.

The application will start and be available at `https://localhost:44384` (or the port specified in your launch settings).

### 4. Import uSync Data

Once the application is up and running:

1. Log in to the Umbraco backoffice at `https://localhost:44384/umbraco`
2. Navigate to **Settings** > **uSync**
3. Click **Import** to import all the content types, document types, data types, and content structure

This will restore all the site configuration and content structure from the uSync files included in the repository.

### 5. Reimport Media Files

The media files are not stored in the database and need to be manually imported:

1. Locate the media files in the `assets` folder at the root of the repository
2. In the Umbraco backoffice, navigate to **Media**
3. Upload/import all media files from the `assets` folder to restore images and other media content used throughout the site

## Troubleshooting

### Database Connection Issues

- Ensure SQL Server is running
- Verify the connection string credentials are correct
- Check that the database exists or that the user has permission to create it

### uSync Import Errors

- Ensure the application has fully started before attempting import
- Check the Umbraco logs for detailed error messages

### Missing Media

- Verify all files from the `assets` folder have been uploaded
- Check that the folder structure matches the expected paths

