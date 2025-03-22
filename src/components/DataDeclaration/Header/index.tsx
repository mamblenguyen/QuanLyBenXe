import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../Button";
import DeletePopup from "../../Popup/Delete";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleDeleteClick = () => setPopupOpen(true);
  const handleCancelDelete = () => setPopupOpen(false);
  const handleConfirmDelete = () => {
    console.log("Deleted!");
    setPopupOpen(false);
  };

  // Xác định link thêm mới dựa trên menu hiện tại
  const getAddLink = () => {
    if (location.pathname.includes("academic-year")) return "/leadership/data-declaration/academic-year/add";
    if (location.pathname.includes("subjects")) return "/leadership/data-declaration/subjects/add";
    if (location.pathname.includes("classes")) return "/leadership/data-declaration/classes/classes-add";
    if (location.pathname.includes("departments")) return "/leadership/data-declaration/departments/departments-add";
    if (location.pathname.includes("score-type")) return "/leadership/data-declaration/score-type/add";
    if (location.pathname.includes("faculty")) return "/leadership/data-declaration/faculty/add";

    return "#"; // Mặc định nếu không khớp menu nào

  };

  return (
    <div className="flex justify-between items-center text-white py-4 mt-15 mb-10">
      {children}
      <div className="flex items-center space-x-4 ml-auto">
        <Button
          label="+ Thêm mới"
          size="big"
          variant="solid"
          textColor="white"
          backgroundColor="#FF7506"
          hoverBackgroundColor="gray-200"
          onClick={() => navigate(getAddLink())} // Điều hướng đến trang thêm phù hợp
        />
      </div>
      <DeletePopup
        isOpen={isPopupOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Xóa"
        text="Xác nhận muốn xóa những thông tin đã được chọn? Sau khi xóa sẽ không thể hoàn tác."
      />
    </div>
  );
};

export default Header;
