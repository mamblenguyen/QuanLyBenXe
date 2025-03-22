import React from 'react';
import { StatusComponentProps } from './type';

const StatusComponent: React.FC<StatusComponentProps> = ({ status, color }) => {
  const styles = {
    wrapper: {
      color: color,
      border: `1px solid ${color}`,
    },
    dot: {
      background: color,
    },
  };

  return (
   <div className="flex justify-center">
      <div className={`inline-flex items-center justify-center px-4 py-2 rounded border gap-2 text-[15px] font-medium whitespace-nowrap`}
        style={{ color: color, borderColor: color }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
        {status}
      </div>
    </div>
  );
};

export default StatusComponent;

/* Use component:
    <StatusComponent status="Đang theo học" color="#49C510" /> 
    <StatusComponent status="Đã thôi học" color="#ED2025" /> 
    <StatusComponent status="Đã tốt nghiệp" color="#0B80EC" /> 
    <StatusComponent status="Đã chuyển lớp" color="#FF7506" /> 
    <StatusComponent status="Đã chuyển trường" color="#373839" /> 
*/
