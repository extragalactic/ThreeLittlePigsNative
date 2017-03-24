package com.threelittlepigsnative;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.reactnative.photoview.PhotoViewPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.rnfs.RNFSPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.calendarevents.CalendarEventsPackage;
import com.auth0.lock.react.LockReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PhotoViewPackage(),
            new ReactNativeRestartPackage(),
            new RNFSPackage(),
            new ReactNativeOneSignalPackage(),
            new RNDeviceInfo(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new ReactMaterialKitPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new ReactNativeIcons(),
            new ReactNativeConfigPackage(),
            new CalendarEventsPackage(),
            new LockReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
