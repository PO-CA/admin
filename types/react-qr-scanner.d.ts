declare module 'react-qr-scanner' {
  import { Component } from 'react';

  interface QrScannerProps {
    delay?: number;
    style?: React.CSSProperties;
    onError?: (error: Error) => void;
    onScan?: (data: { text: string } | null) => void;
    [key: string]: any;
  }

  export default class QrScanner extends Component<QrScannerProps> {}
}
