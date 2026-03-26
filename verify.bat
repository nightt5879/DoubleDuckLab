@echo off
setlocal

cd /d "%~dp0"

set "NO_PAUSE="
if /i "%~1"=="--no-pause" set "NO_PAUSE=1"

set "EXIT_CODE=0"

echo [verify.bat] repo: %CD%

if not exist node_modules (
  echo [verify.bat] node_modules not found, running npm install...
  call npm.cmd install
  if errorlevel 1 (
    set "EXIT_CODE=%ERRORLEVEL%"
    goto finish
  )
)

echo [verify.bat] step 1/4: validate content
call npm.cmd run validate:content
if errorlevel 1 (
  set "EXIT_CODE=%ERRORLEVEL%"
  goto finish
)

echo [verify.bat] step 2/4: build site
set "ASTRO_TELEMETRY_DISABLED=1"
call npm.cmd run build
if errorlevel 1 (
  set "EXIT_CODE=%ERRORLEVEL%"
  goto finish
)

echo [verify.bat] step 3/4: smoke test built routes
call npm.cmd run test:smoke
if errorlevel 1 (
  set "EXIT_CODE=%ERRORLEVEL%"
  goto finish
)

echo [verify.bat] step 4/4: verify SEO and locale alternates
call npm.cmd run test:seo
if errorlevel 1 (
  set "EXIT_CODE=%ERRORLEVEL%"
  goto finish
)

echo [verify.bat] success: validation, build, smoke test, and SEO checks all passed.

:finish
if not "%EXIT_CODE%"=="0" (
  echo [verify.bat] failed with exit code %EXIT_CODE%.
)

if not defined NO_PAUSE (
  echo.
  pause
)

exit /b %EXIT_CODE%
