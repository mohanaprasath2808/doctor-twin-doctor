import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface ProfileAvatarProps {
  overlaySource: ImageSourcePropType;
  imageSource: ImageSourcePropType;
  containerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
  overlayStyle?: ImageStyle;
  imageStyle?: ImageStyle;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  overlaySource,
  imageSource,
  containerStyle,
  wrapperStyle,
  overlayStyle,
  imageStyle,
}) => {
  return (
    <View style={[styles.imageContainer, containerStyle]}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Image source={overlaySource} style={[styles.overlayImage, overlayStyle]} />
        <Image source={imageSource} style={[styles.image, imageStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  wrapper: {
    width: 240,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlayImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    borderRadius: 115,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 115,
  },
});

export default ProfileAvatar;
