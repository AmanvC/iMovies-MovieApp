import { useState } from "react";
import "./switchTabs.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  // Pass index here
  const [selected, setSelected] = useState(0);
  // For moving background
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    // 100 is the width of background
    setLeft(index * 100);
    setTimeout(() => {
      setSelected(index);
    }, 300);
    onTabChange(tab);
  };

  return (
    <div className="switch-tabs">
      <div className="tab-items">
        {data?.map((tab, index) => (
          <span
            key={index}
            className={`tab-item ${selected === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="moving-bg" style={{ left: left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
