
//
//  PayTabs SDK Integration with React Native.
//
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface PayTabs : NSObject <RCTBridgeModule, UIViewControllerTransitioningDelegate>
@property RCTPromiseResolveBlock resolveObj;

@end
