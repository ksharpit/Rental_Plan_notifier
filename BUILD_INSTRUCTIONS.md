# 📱 BikeShare Customer Manager - Android APK Build Instructions

## Prerequisites

Before building the Android APK, ensure you have the following installed:

### 1. **Node.js & npm**
```bash
# Check if installed
node --version
npm --version
```

### 2. **Android Studio**
- Download from: https://developer.android.com/studio
- Install Android SDK (API level 34)
- Install Android Build Tools
- Set up Android Virtual Device (AVD) for testing

### 3. **Java Development Kit (JDK)**
```bash
# Install JDK 17 (recommended)
# On Windows: Download from Oracle or use chocolatey
choco install openjdk17

# On macOS: Use Homebrew
brew install openjdk@17

# On Linux: Use package manager
sudo apt install openjdk-17-jdk
```

### 4. **Environment Variables**
Add these to your system environment variables:

```bash
# Android SDK path (adjust path as needed)
export ANDROID_HOME=$HOME/Android/Sdk
export ANDROID_SDK_ROOT=$HOME/Android/Sdk

# Add to PATH
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin

# Java path
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

## 🚀 Build Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Initialize Capacitor
```bash
# Install Capacitor CLI globally
npm install -g @capacitor/cli

# Initialize Capacitor (if not already done)
npx cap init "BikeShare Customer Manager" "com.bikeshare.customerapp"

# Add Android platform
npx cap add android
```

### Step 3: Build Web Assets
```bash
npm run build
```

### Step 4: Sync with Capacitor
```bash
npx cap sync android
```

### Step 5: Open in Android Studio
```bash
npx cap open android
```

### Step 6: Build APK in Android Studio

1. **Open the project** in Android Studio
2. **Wait for Gradle sync** to complete
3. **Build APK**:
   - Go to `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Or use: `Build` → `Generate Signed Bundle / APK`

### Step 7: Alternative - Command Line Build
```bash
# Navigate to android directory
cd android

# Build debug APK
./gradlew assembleDebug

# Build release APK (requires signing)
./gradlew assembleRelease
```

## 📁 APK Location

After successful build, find your APK at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 🔧 Development Commands

```bash
# Run on connected device/emulator
npm run android

# Build and run
npm run android:build

# Sync changes
npm run capacitor:sync

# Open Android Studio
npm run capacitor:open
```

## 📱 Testing

### On Emulator:
1. Start Android Studio
2. Open AVD Manager
3. Start an emulator
4. Run: `npm run android`

### On Physical Device:
1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect device via USB
4. Run: `npm run android`

## 🔐 Release Build (Production)

### 1. Generate Signing Key
```bash
keytool -genkey -v -keystore bikeshare-release-key.keystore -alias bikeshare -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Configure Signing in `android/app/build.gradle`
```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('../../bikeshare-release-key.keystore')
            storePassword 'your-store-password'
            keyAlias 'bikeshare'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 3. Build Release APK
```bash
cd android
./gradlew assembleRelease
```

## 📋 App Features in APK

✅ **Customer Management**
- Add new customers with payment tracking
- View customer lists with subscription status
- Search and filter customers

✅ **Dashboard Analytics**
- Expiring plans overview
- New customer tracking
- Real-time statistics

✅ **Plan Management**
- Weekly (₹1,857) and Monthly (₹7,000) plans
- Unlimited minutes and kilometers
- One-time setup fee (₹500)

✅ **Alert System**
- Plan expiry notifications
- Customer retention alerts
- Priority-based notifications

✅ **Battery Stations**
- LIG Colony station
- Niranjanpur station
- Station availability tracking

✅ **Mobile Optimized**
- Touch-friendly interface
- Responsive design
- Native Android experience

## 🐛 Troubleshooting

### Common Issues:

1. **Gradle Build Failed**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew build
   ```

2. **SDK Not Found**
   - Verify ANDROID_HOME environment variable
   - Install required SDK versions in Android Studio

3. **Capacitor Sync Issues**
   ```bash
   npx cap clean android
   npx cap add android
   npx cap sync android
   ```

4. **Build Tools Version**
   - Update Android Studio
   - Install latest build tools via SDK Manager

## 📞 Support

For build issues:
1. Check Android Studio logs
2. Verify all prerequisites are installed
3. Ensure environment variables are set correctly
4. Try cleaning and rebuilding the project

## 🎯 Final APK Features

Your APK will include:
- **Offline Storage**: Customer data stored locally
- **Native Performance**: Smooth Android experience
- **Professional UI**: Material Design principles
- **Business Ready**: Complete customer management system
- **Scalable**: Easy to add new features

The APK will be approximately 15-25 MB and compatible with Android 5.1+ (API level 22+).