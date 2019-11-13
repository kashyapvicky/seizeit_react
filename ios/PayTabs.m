//
//  PayTabs.m
//  seize_it
//
//  Created by Apple on 13/11/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

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
    PTFWInitialSetupViewController *paytabsVC;
  //  paytabsVC  = [self->paytabsVC]
  //  @property (nonatomic) float amount;
  // amount = jsonObj[@"pt_amount"];
  //
  //   @property (nonatomic) float taxAmount;
  //  taxAmount = jsonObj[@"pt_tax_amount"];
  
  NSBundle *bundle = [NSBundle bundleWithURL:[[NSBundle mainBundle] URLForResource:@"Resources" withExtension:@"bundle"]];
PTFWInitialSetupViewController *view = [[PTFWInitialSetupViewController alloc]                                                     andWithViewFrame:self.accessibilityFrame
                                                        andWithAmount:[jsonObj[@"pt_amount"] floatValue]
                                                 andWithCustomerTitle:jsonObj[@"pt_transaction_title"]
                                                  andWithCurrencyCode:jsonObj[@"pt_currency_code"]
                                                     andWithTaxAmount:[jsonObj[@"pt_tax_amount"] floatValue]
                                                   andWithSDKLanguage:jsonObj[@"locale"]
                                               andWithShippingAddress:jsonObj[@"pt_address_shipping"]
                                                  andWithShippingCity:jsonObj[@"pt_city_shipping"]
                                               andWithShippingCountry:jsonObj[@"pt_country_shipping"]
                                                 andWithShippingState:jsonObj[@"pt_state_shipping"]
                                               andWithShippingZIPCode:jsonObj[@"pt_postal_code_shipping"]
               
                                                andWithBillingAddress:jsonObj[@"pt_address_billing"]
                                                   andWithBillingCity:jsonObj[@"pt_city_billing"]
                                                andWithBillingCountry:jsonObj[@"pt_country_billing"]
                                                  andWithBillingState:jsonObj[@"pt_state_billing"]
                                                andWithBillingZIPCode:jsonObj[@"pt_postal_code_billing"]
               
                                                       andWithOrderID:jsonObj[@"pt_order_id"]
                                                   andWithPhoneNumber:jsonObj[@"pt_customer_phone_number"]
                                                 andWithCustomerEmail:jsonObj[@"pt_customer_email"]
                                                    andIsTokenization:false
                                                 andWithMerchantEmail:jsonObj[@"pt_merchant_email"]
                                             andWithMerchantSecretKey:jsonObj[@"pt_secret_key"]
                                                  andWithAssigneeCode:@"SDK"
                                                    andWithThemeColor:[UIColor colorWithRed:225.0/255.0 green:225.0/255.0 blue:225.0/255.0 alpha:1.0]
                                                 andIsThemeColorLight:true];
  __weak typeof(self) weakSelf = self;
  
  
  UIViewController *rootViewController = [[[[UIApplication sharedApplication]delegate] window] rootViewController];
  [rootViewController presentViewController:paytabsVC animated:true completion:nil];
  paytabsVC.transitioningDelegate = self;
  
  paytabsVC.didReceiveBackButtonCallback = ^{
    [paytabsVC dismissViewControllerAnimated:true completion:nil];
  };
  
  paytabsVC.didReceiveFinishTransactionCallback = ^(int responseCode, NSString * _Nonnull result, int transactionID, NSString * _Nonnull tokenizedCustomerEmail, NSString * _Nonnull tokenizedCustomerPassword, NSString * _Nonnull token, BOOL transactionState) {
    
    NSLog(@"transaction Id %@",  [[NSUserDefaults standardUserDefaults] objectForKey:@"transactionID"]);
    NSLog(@"Response Code %@", [[NSUserDefaults standardUserDefaults] objectForKey:@"responseCode"]);
    NSLog(@"Description %@", [[NSUserDefaults standardUserDefaults] objectForKey:@"result"]);
    
    NSMutableDictionary* json = [NSMutableDictionary new];
    json[@"transactionID"] =@(transactionID);
    json[@"responseCode"] =@(responseCode);
    json[@"result"] =@"result";
    self.resolveObj(json);
    //      [self dismissViewControllerAnimated:false completion:nil];
    [paytabsVC dismissViewControllerAnimated:true completion:nil];
    
  };
  //  [self->paytabsVC.view addSubview:paytabsVC.view];
  //  [self->paytabsVC addChildViewController:paytabsVC];
  //  [paytabsVC didMoveToParentViewController:self];
}
//- (void) closePayTabsView {
//  [self->paytabsVC willMoveToParentViewController:self];
//  [self->paytabsVC.view removeFromSuperview];
//  [self->paytabsVC removeFromParentViewController];
//}

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
