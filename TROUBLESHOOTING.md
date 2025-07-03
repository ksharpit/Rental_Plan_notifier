# 🔧 Android Build Troubleshooting Guide

## Common Build.gradle Errors & Solutions

### 1. **Gradle Version Compatibility**
```bash
# Error: "Could not find com.android.tools.build:gradle:X.X.X"
# Solution: Update gradle wrapper
cd android
./gradlew wrapper --gradle-version=8.4
```

### 2. **SDK Version Issues**
```bash
# Error: "Failed to find target with hash string 'android-34'"
# Solution: Install required SDK in Android Studio
# Go to: Tools → SDK Manager → Install Android 14 (API 34)
```

### 3. **Java Version Mismatch**
```bash
# Error: "Unsupported class file major version"
# Solution: Ensure Java 17 is installed and set as JAVA_HOME
java -version  # Should show version 17.x.x
```

### 4. **Clean Build Issues**
```bash
# If build fails, try cleaning:
cd android
./gradlew clean
./gradlew build
```

### 5. **Capacitor Sync Problems**
```bash
# Reset Capacitor configuration:
npx cap clean android
rm -rf android
npx cap add android
npx cap sync android
```

### 6. **Memory Issues**
Add to `android/gradle.properties`:
```
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=true
```

### 7. **Network/Proxy Issues**
```bash
# If behind corporate firewall, add to gradle.properties:
systemProp.http.proxyHost=your.proxy.host
systemProp.http.proxyPort=8080
systemProp.https.proxyHost=your.proxy.host
systemProp.https.proxyPort=8080
```

### 8. **Android Studio Sync Issues**
1. **File** → **Invalidate Caches and Restart**
2. **File** → **Sync Project with Gradle Files**
3. **Build** → **Clean Project**
4. **Build** → **Rebuild Project**

### 9. **Environment Variables Check**
```bash
# Verify these are set correctly:
echo $ANDROID_HOME
echo $JAVA_HOME
echo $PATH
```

### 10. **Alternative Build Methods**

#### Method A: Command Line Only
```bash
# Build without Android Studio
cd android
./gradlew assembleDebug
```

#### Method B: Using Capacitor CLI
```bash
# Build and run directly
npx cap run android
```

#### Method C: Manual APK Generation
```bash
# Generate unsigned APK
cd android
./gradlew assembleDebug

# APK location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## 🚨 Emergency Build Steps

If all else fails, try this complete reset:

```bash
# 1. Clean everything
rm -rf node_modules
rm -rf android
rm package-lock.json

# 2. Fresh install
npm install

# 3. Rebuild web assets
npm run build

# 4. Re-add Android
npx cap add android

# 5. Sync
npx cap sync android

# 6. Try command line build
cd android
./gradlew assembleDebug
```

## 📱 Quick APK Generation (No Android Studio)

```bash
# Complete build process without Android Studio:
npm install
npm run build
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug

# Your APK will be at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## ✅ Verification Steps

After successful build:
1. APK file exists at expected location
2. APK size is reasonable (15-30 MB)
3. APK installs on device/emulator
4. App launches without crashes
5. Login works with demo credentials

## 📞 Still Having Issues?

1. **Check Android Studio logs** for specific error messages
2. **Verify all prerequisites** are installed correctly
3. **Try building a simple Capacitor app** first to test setup
4. **Check Capacitor documentation** for latest requirements
5. **Consider using older/stable versions** if latest versions cause issues

## 🎯 Success Indicators

✅ Gradle sync completes without errors
✅ Build process finishes successfully  
✅ APK file is generated
✅ App installs and runs on device
✅ All features work as expected