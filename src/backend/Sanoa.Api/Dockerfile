# --- STAGE 1: Angular Build ---
FROM node:22-alpine AS angular-build
WORKDIR /frontend-src

# WICHTIG: Pfad ist jetzt src/frontend
COPY src/frontend/package*.json ./
RUN npm install
COPY src/frontend/ ./
# Prüfe in deiner angular.json den 'outputPath' (meist dist/projektname/browser)
RUN npm run build -- --configuration=production

# --- STAGE 2: .NET Base ---
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# --- STAGE 3: .NET Build & Publish ---
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Kopiere die .csproj aus dem Api-Ordner
COPY ["Sanoa.Api/Sanoa.Api.csproj", "Sanoa.Api/"]
RUN dotnet restore "Sanoa.Api/Sanoa.Api.csproj"
COPY Sanoa.Api/ ./Sanoa.Api/
WORKDIR "/src/Sanoa.Api"

# --- Frontend Dateien in den wwwroot der API kopieren ---
# Ersetze 'sanoa-frontend' durch den tatsächlichen Namen aus deiner angular.json
COPY --from=angular-build /frontend-src/dist/sanoa-frontend/browser ./wwwroot

RUN dotnet build "Sanoa.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Sanoa.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# --- STAGE 4: Final Stage ---
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Sanoa.Api.dll"]
