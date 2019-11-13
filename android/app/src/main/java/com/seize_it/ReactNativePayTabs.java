package com.seizeit;

//Android

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.DisplayMetrics;
import android.util.Log;
import android.widget.Toast;
import android.content.res.Configuration;
import android.content.res.Resources;

//React Native
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.ReadableMap;
import com.seizeit.ReactNativePayTabsPackage;

import java.util.Locale;

import com.paytabs.paytabs_sdk.payment.ui.activities.PayTabActivity;
import com.paytabs.paytabs_sdk.utils.PaymentParams;

public class ReactNativePayTabs extends ReactContextBaseJavaModule {
    private Context context;
    private Promise mPickerPromise;
    private static final int PAYTAB_REQUEST_CODE = 100;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_PAYTAB_CANCELLED = "E_PAYTAB_CANCELLED";
    private static final String E_FAILED_TO_PAYTAB = "E_FAILED_TO_PAYTAB";
    private static final String E_FAILED_TO_PAYMENT = "E_FAILED_TO_PAYMENT";
    private static final String E_NO_DATA_FOUND = "E_NO_DATA_FOUND";
    private static final String E_CANCELLED = "E_CANCELLED";

    //Onactivity Event listner
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == PaymentParams.PAYMENT_REQUEST_CODE) {
                if (mPickerPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPickerPromise.reject(E_FAILED_TO_PAYMENT, "Paytab was cancelled");
                    } else if (resultCode == Activity.RESULT_OK) {
                        WritableMap resultData = new WritableNativeMap();
                        resultData.putString("TRANSACTION_ID", data.getStringExtra(PaymentParams.TRANSACTION_ID));
                        resultData.putString("RESPONSE_CODE", data.getStringExtra(PaymentParams.RESPONSE_CODE));
                        resultData.putString("RESULT_MESSAGE", data.getStringExtra(PaymentParams.RESULT_MESSAGE));
                        if (resultData == null) {
                            mPickerPromise.reject(E_NO_DATA_FOUND, "No paytab data found");
                        } else {
                            mPickerPromise.resolve(resultData);
                        }
                    }
                }
                mPickerPromise = null;
            }
        }
    };


    public ReactNativePayTabs(ReactApplicationContext reactContext) {
        super(reactContext);
        // Add the listener for `onActivityResult`
        this.context = reactContext;
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "PayTabs";
    }

    @ReactMethod
    public void createOrder(ReadableMap data, final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }
        // // Store the promise to resolve/reject when picker returns data
        mPickerPromise = promise;
        String lang = data.hasKey("LANGUAGE") ? data.getString("LANGUAGE") : PaymentParams.ENGLISH;
        Locale myLocale = new Locale(lang);
        Resources res = context.getResources();
        DisplayMetrics dm = res.getDisplayMetrics();
        Configuration conf = res.getConfiguration();
        conf.locale = myLocale;
        try {
            final Intent in = new Intent(context, PayTabActivity.class);
            in.putExtra(PaymentParams.MERCHANT_EMAIL, data.getString("MERCHANT_EMAIL")); //this a demo account for testing the sdk
            in.putExtra(PaymentParams.SECRET_KEY, data.getString("SECRET_KEY"));//Add your Secret Key Here
            in.putExtra(PaymentParams.LANGUAGE, lang);
            in.putExtra(PaymentParams.TRANSACTION_TITLE, data.getString("TRANSACTION_TITLE"));
            in.putExtra(PaymentParams.AMOUNT, data.getDouble("AMOUNT"));

            in.putExtra(PaymentParams.CURRENCY_CODE, data.getString("CURRENCY_CODE"));
            in.putExtra(PaymentParams.CUSTOMER_PHONE_NUMBER, data.getString("CUSTOMER_PHONE_NUMBER"));
            in.putExtra(PaymentParams.CUSTOMER_EMAIL, data.getString("CUSTOMER_EMAIL"));
            in.putExtra(PaymentParams.ORDER_ID, data.getString("ORDER_ID"));
            in.putExtra(PaymentParams.PRODUCT_NAME, data.getString("PRODUCT_NAME"));

//Billing Address
            in.putExtra(PaymentParams.ADDRESS_BILLING, data.getString("ADDRESS_BILLING"));
            in.putExtra(PaymentParams.CITY_BILLING, data.getString("CITY_BILLING"));
            in.putExtra(PaymentParams.STATE_BILLING, data.getString("STATE_BILLING"));
            in.putExtra(PaymentParams.COUNTRY_BILLING, data.getString("COUNTRY_BILLING"));
            in.putExtra(PaymentParams.POSTAL_CODE_BILLING, data.getString("POSTAL_CODE_BILLING")); //Put Country Phone code if Postal code not available '00973'

//Shipping Address
            in.putExtra(PaymentParams.ADDRESS_SHIPPING, data.getString("ADDRESS_SHIPPING"));
            in.putExtra(PaymentParams.CITY_SHIPPING, data.getString("CITY_SHIPPING"));
            in.putExtra(PaymentParams.STATE_SHIPPING, data.getString("STATE_SHIPPING"));
            in.putExtra(PaymentParams.COUNTRY_SHIPPING, data.getString("COUNTRY_SHIPPING"));
            in.putExtra(PaymentParams.POSTAL_CODE_SHIPPING, data.getString("POSTAL_CODE_SHIPPING")); //Put Country Phone code if Postal code not available '00973'

//Payment Page Style
            in.putExtra(PaymentParams.PAY_BUTTON_COLOR, data.hasKey("PAY_BUTTON_COLOR") ? data.getString("PAY_BUTTON_COLOR") : "#2474bc");
//Tokenization
            in.putExtra(PaymentParams.IS_TOKENIZATION, true);
            int requestCode = 0;
            currentActivity.startActivityForResult(in, PaymentParams.PAYMENT_REQUEST_CODE);
        } catch (Exception e) {
            mPickerPromise.reject(E_FAILED_TO_PAYMENT, e);
            mPickerPromise = null;
        }
    }


}