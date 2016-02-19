//React Native Audio Player logic(no UI)

#import "RCTBridgeModule.h"
@import AVFoundation;

@interface RNAudioPlayerURL : NSObject <RCTBridgeModule>

@property (nonatomic, readonly) AVPlayerItemStatus status;
@property (strong, nonatomic) AVPlayerItem *audioItem;
@property (strong, nonatomic) AVPlayer *audioPlayer;

@end
