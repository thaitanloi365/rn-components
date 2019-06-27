declare module "rn-components" {
  import * as React from "react";
  import {
    ViewProps,
    ViewStyle,
    TouchableOpacityProps,
    TouchableNativeFeedbackProps,
    TextStyle,
    ImageStyle,
    StyleProp,
    StyleSheet as RNStyleSheet,
    RegisteredStyle,
    FlexAlignType,
    ScrollViewProps as RNScrollViewProps,
    TextProps as RNTextProps,
    StatusBarProps as RNStatusBarProps,
    ImageSourcePropType,
    StatusBarStyle,
    TextInputProps as RNTextInputProps
  } from "react-native";

  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type LinearProps = {
    start?: Point;
    end?: Point;
    locations?: number[];
    colors?: string[];
  };

  type Point = {
    x: number;
    y: number;
  };

  type Style = Partial<ViewStyle | TextStyle | ImageStyle>;

  type StyleObject = { [className: string]: StyleProp<Style> };

  type NamedStyles<T> = { [P in keyof T]: StyleProp<Style> };

  type DeviceType = "Phone" | "Tablet";

  interface AbsoluteFillStyle {
    position: "absolute";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  interface TouchableProps extends ViewProps, TouchableOpacityProps, TouchableNativeFeedbackProps {
    ViewComponent?: React.ComponentClass<any>;
    linearProps?: LinearProps;
    contentStyle?: ViewStyle;
    boundedRipple?: boolean;
  }

  interface ColProps extends ViewProps {
    onPress?: () => void;
    flex?: number;
    children?: React.ReactElement[] | React.ReactNode;
    alignSelf?: "auto" | FlexAlignType;
    alignHorizontal?: FlexAlignType;
    alignVertical?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  }

  interface RowProps extends ViewProps {
    onPress?: () => void;
    flex?: number;
    children?: React.ReactElement[] | React.ReactNode;
    alignSelf?: "auto" | FlexAlignType;
    alignVertical?: FlexAlignType;
    alignHorizontal?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  }

  interface GridProps extends ViewProps {
    children: React.ReactNode[];
    numCols?: number;
    onPress?: () => void;
    rowStyle?: StyleProp<ViewStyle>;
    stretchVertical?: boolean;
  }

  interface OverlayProps extends ViewProps {
    onPressOutside?: () => void;
    overlayColor?: string;
    animated?: boolean;
    duration?: number;
  }

  interface KeyboardSpacerProps extends ViewProps {
    keyboardTopOffset?: number;
    onShow?: (keyboardSpacer: number, keyboardTop: number) => void;
    onHide?: () => void;
  }

  interface ScrollViewProps extends RNScrollViewProps {
    keyboardTopOffset?: number;
    inputBottomOffset?: number;
    navigation?: any;
    autoScrollNextInput?: boolean;
  }

  interface TextProps extends RNTextProps {
    text?: string | number;
    onPress?: () => void;
    activeOpacity?: number;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
  }

  interface TextareaProps extends TextInputExtraProps {
    onPress?: () => void;
    inputContainerStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle>;
    helperText?: string;
    helperStyle?: StyleProp<TextStyle>;
  }
  interface StatusBarProps extends RNStatusBarProps {}

  interface HeaderProps extends ViewProps {
    statusBarVisible?: boolean;
    statusBarProps?: StatusBarProps;
    title?: string;
    titleStyle?: StyleProp<TextStyle>;
    titleContainerStyle?: StyleProp<ViewStyle>;
    LeftComponent?: React.ReactElement | React.FunctionComponent;
    leftContainerStyle?: StyleProp<ViewStyle>;
    RightComponent?: React.ReactElement | React.FunctionComponent;
    rightContainerStyle?: StyleProp<ViewStyle>;
    backgroundColor?: string;
    headerStyle?: StyleProp<ViewStyle>;
    children?: React.ReactChild;
  }

  type TextInputExtraProps = Omit<RNTextInputProps, "style"> & ViewProps;

  type InputGroupProps = ViewProps & {
    onInputFocus?: (index: number) => void;
    onInputSubmit?: () => void;
    spacing?: number;
    numberInputs?: number;
    scrollViewRef?: React.RefObject<ScrollView>;
  };

  interface TextInputProps extends TextInputExtraProps {
    underlineColor?: string;
    underlineWidth?: number;
    inputContainerStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle>;
    helperText?: string;
    helperStyle?: StyleProp<TextStyle>;
    LeftComponent?: React.ReactElement | React.FunctionComponent;
    RightComponent?: React.ReactElement | React.FunctionComponent;
    InputAccessoryComponent?: React.ReactElement | React.FunctionComponent;
    inputAccessoryContainerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
  }

  interface ButtonProps extends TouchableProps {
    rasied?: boolean;
    text?: React.ReactText;
    textStyle?: StyleProp<TextStyle>;
  }

  interface IconProps extends ViewProps {
    size?: number;
    iconSource: ImageSourcePropType;
    iconStyle?: StyleProp<ImageStyle>;
    iconContainerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?: () => void;
  }

  export class Touchable extends React.Component<TouchableProps, any> {}

  export class Col extends React.Component<ColProps, any> {}

  export class Row extends React.Component<RowProps, any> {}

  export class Grid extends React.Component<GridProps, any> {}

  export namespace StyleSheet {
    export function create<T extends NamedStyles<T>>(styles: T | StyleObject): T;

    export function flatten<T>(style?: RegisteredStyle<T>): T;

    export const absoluteFillObject: AbsoluteFillStyle;

    export const absoluteFill: RegisteredStyle<AbsoluteFillStyle>;

    export const hairlineWidth: number;
  }

  export class ScrollView extends React.Component<ScrollViewProps, any> {
    scrollToNode(node, offset?: number): void;
    scrollToCurrentInput(offset?: number): void;
  }

  export class KeyboardSpacer extends React.Component<KeyboardSpacerProps, any> {}

  export namespace Device {
    export function isAndroid(): boolean;

    export function isIOS(): boolean;

    export function getScreenSize(): { width: number; height: number };

    export function isIphoneX(): boolean;

    export function ifIphoneX<A, B>(iphoneXStyle: A, regularStyle: B): A | B;

    export function getStatusBarHeight(safe?: boolean): number;

    export function getHeaderHeight(): number;

    export function deviceType(): DeviceType;

    export function getStatusBarStyle(): StatusBarStyle | null;

    export function setBaseSize(width: number, height: number): void;
  }

  export class Text extends React.Component<TextProps, any> {}

  export class Button extends React.Component<ButtonProps, any> {}

  export class Header extends React.Component<HeaderProps, any> {}

  export class Icon extends React.Component<IconProps, any> {}

  export class StatusBar extends React.Component<StatusBarProps, any> {}

  export class StyleSheetTextInput extends React.Component<TextInputProps, any> {}

  export class InputGroup extends React.Component<InputGroupProps, any> {
    scrollToInput(): void;

    clearText(atIndex: number): void;

    getText(atIndex: number): string;

    getAllText(): string[];

    focus(atIndex): void;
  }

  export class TextInput extends React.Component<TextInputProps, any> {
    setNativeProps(props: any): void;

    blur(): void;

    focus(): void;

    clearText(): void;

    getText(): string;
  }

  export class Textarea extends React.Component<TextareaProps, any> {
    setNativeProps(props: any): void;

    blur(): void;

    focus(): void;

    clearText(): void;

    getText(): string;
  }
}
