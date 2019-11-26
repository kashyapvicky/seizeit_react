

//
//  HelloManager.m
//  paytab
//
//  Created by Mohamed Ibrahim on 9/23/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <React/RCTLog.h>

#import "PayTabs.h"
#import <paytabs-iOS/paytabs_iOS.h>

@interface PayTabs()
{
  PTFWInitialSetupViewController *paytabsVC;
}
@end

@implementation PayTabs


RCT_EXPORT_MODULE(PayTabs)
RCT_REMAP_METHOD(isSimulator, resolver: (RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  if( TARGET_IPHONE_SIMULATOR ) {
    NSString *thingToReturn = @"Yes";
    resolve(thingToReturn);
  } else {
    NSString *thingToReturn = @"No";
    resolve(thingToReturn);
  }
}
RCT_EXPORT_METHOD(createOrder:(NSDictionary *)jsonObj
                  createOrderWithResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
{
  self.resolveObj = resolve;
  [self checking:jsonObj];
}

- (IBAction)checking:(NSDictionary*)jsonObj {
#if TARGET_IPHONE_SIMULATOR
  return;
#endif
  NSBundle *bundle = [NSBundle bundleWithURL:[[NSBundle mainBundle] URLForResource:@"Resources" withExtension:@"bundle"]];
   PTFWInitialSetupViewController *paytabsVC = [[PTFWInitialSetupViewController alloc]
   initWithBundle:bundle
   andWithViewFrame:self.accessibilityFrame
   andWithAmount:[jsonObj[@"AMOUNT"] floatValue]
   andWithCustomerTitle:jsonObj[@"TRANSACTION_TITLE"]
   andWithCurrencyCode:jsonObj[@"CURRENCY_CODE"]
   andWithTaxAmount:[jsonObj[@"TAX"] floatValue]
   andWithSDKLanguage:jsonObj[@"LANGUAGE"]
   andWithShippingAddress:jsonObj[@"ADDRESS_SHIPPING"]
   andWithShippingCity:jsonObj[@"CITY_SHIPPING"]
   andWithShippingCountry:jsonObj[@"COUNTRY_SHIPPING"]
   andWithShippingState:jsonObj[@"STATE_SHIPPING"]
   andWithShippingZIPCode:jsonObj[@"POSTAL_CODE_SHIPPING"]
   andWithBillingAddress:jsonObj[@"ADDRESS_BILLING"]
   andWithBillingCity:jsonObj[@"CITY_BILLING"]
   andWithBillingCountry:jsonObj[@"COUNTRY_BILLING"]
   andWithBillingState:jsonObj[@"STATE_BILLING"]
   andWithBillingZIPCode:jsonObj[@"POSTAL_CODE_BILLING"]
   andWithOrderID:jsonObj[@"ORDER_ID"]
   andWithPhoneNumber:jsonObj[@"CUSTOMER_PHONE_NUMBER"]
   andWithCustomerEmail:jsonObj[@"CUSTOMER_EMAIL"]
   andIsTokenization:NO
   andIsPreAuth:NO
   andWithMerchantEmail:jsonObj[@"MERCHANT_EMAIL"]
   andWithMerchantSecretKey:jsonObj[@"SECRET_KEY"]
   andWithAssigneeCode:@"SDK"
   andWithThemeColor: [UIColor colorWithRed:0.59 green:0.77 blue:0.06 alpha:1]
                                                andIsThemeColorLight:YES];

  

  UIViewController *rootViewController = [[[[UIApplication sharedApplication]delegate] window] rootViewController];
  paytabsVC.transitioningDelegate = self;

  [rootViewController presentViewController:paytabsVC animated:false completion:nil];

  paytabsVC.didReceiveBackButtonCallback = ^{
  
    [paytabsVC dismissViewControllerAnimated:true completion:nil];
  };

  paytabsVC.didReceiveFinishTransactionCallback = ^(int responseCode, NSString * _Nonnull result, int transactionID, NSString * _Nonnull tokenizedCustomerEmail, NSString * _Nonnull tokenizedCustomerPassword, NSString * _Nonnull token, BOOL transactionState) {
    NSLog(@"transaction Id %@",  [[NSUserDefaults standardUserDefaults] objectForKey:@"transactionID"]);
    NSLog(@"Response Code %@", [[NSUserDefaults standardUserDefaults] objectForKey:@"responseCode"]);
    NSLog(@"Description %@", [[NSUserDefaults standardUserDefaults] objectForKey:@"result"]);
    
    NSMutableDictionary* json = [NSMutableDictionary new];
    json[@"TRANSACTION_ID"] =@(transactionID);
    json[@"RESPONSE_CODE"] =@(responseCode);
    json[@"result"] =@"result";
    self.resolveObj(json);
    [paytabsVC dismissViewControllerAnimated:true completion:nil];
    [self->paytabsVC willMoveToParentViewController:self];
    [self->paytabsVC removeFromParentViewController];
   // [self dismissViewControllerAnimated:false completion:nil];
    
  };

}
- (void) closePayTabsView {
//  [self->paytabsVC willMoveToParentViewController:self];
//  [self->paytabsVC.view removeFromSuperview];
//  [self->paytabsVC removeFromParentViewController];
}

//-(id<UIViewControllerAnimatedTransitioning>)animationControllerForDismissedController:(UIViewController *)dismissed{
////
////  NSLog(@"transaction Id %@", [[NSUserDefaults standardUserDefaults] objectForKey:@"transactionID"]);
////  NSLog(@"Response Code %@", [[NSUserDefaults standardUserDefaults] objectForKey:@"responseCode"]);
////  NSLog(@"Description %@", [[NSUserDefaults standardUserDefaults] objectForKey:@"result"]);
////
////  NSMutableDictionary* json = [NSMutableDictionary new];
////  json[@"transactionID"] =[[NSUserDefaults standardUserDefaults] objectForKey:@"transactionID"];
////  json[@"responseCode"] =[[NSUserDefaults standardUserDefaults] objectForKey:@"responseCode"];
////  json[@"result"] =[[NSUserDefaults standardUserDefaults] objectForKey:@"result"];
////  self.resolveObj(json);
////   return  [self->paytabsVC ];
//}
@end

