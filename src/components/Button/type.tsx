export interface ButtonProps {
  /**
   * Nội dung hiển thị trên nút ( bắt buộc).
   */
  label: string;

  /**
   * Kích thước của nút.
   * - 'mini': Nhỏ.
   * - 'medium': Trung bình.
   * - 'big': Lớn.
   * ( bắt buộc)
   */
  size: 'mini' | 'medium' | 'big';

  /**
   * Kiểu dáng của nút.
   * - 'solid': Nền đầy màu (mặc định).
   * - 'outline': Viền có màu nhưng nền trong suốt.
   * - 'ghost': Không viền, chỉ có màu chữ và hover đặc biệt.
   * - 'none': Không có viền, không có nền (chỉ hiển thị chữ và icon).
   * ( bắt buộc)
   */
  variant: 'solid' | 'outline' | 'ghost' | 'none';

  /**
   * Trạng thái vô hiệu hóa của nút.
   * Nếu là `true`, nút sẽ không thể click và hiển thị kiểu disabled.
   * Mặc định là `false`.
   * (không bắt buộc)
   */
  disabled?: boolean;

  /**
   * Icon hiển thị trên nút (không bắt buộc).
   */
  icon?: React.ReactNode;

  /**
   * Vị trí của icon.
   * - 'left': Icon nằm bên trái văn bản.
   * - 'right': Icon nằm bên phải văn bản.
   * ( bắt buộc)
   */
  iconPosition?: 'left' | 'right';

  /**
   * Sự kiện được kích hoạt khi nhấn nút ( bắt buộc).
   */
  onClick: () => void;

  /**
   * Màu chữ tùy chỉnh (không bắt buộc).
   */
  textColor?: string;

  /**
   * Màu nền tùy chỉnh (không bắt buộc).
   */
  backgroundColor?: string;

  /**
   * Tùy chỉnh viền của nút (không bắt buộc).
   */
  border?: string;

  /**
   * Màu nền khi hover (không bắt buộc).
   */
  hoverBackgroundColor?: string;

  /**
   * Loại con trỏ khi hover (không bắt buộc).
   * - 'pointer': Dạng bàn tay (mặc định).
   * - 'not-allowed': Biểu tượng cấm (khi `disabled`).
   * - 'default': Con trỏ mặc định.
   */
  hoverCursor?: 'pointer' | 'not-allowed' | 'default';
}
