import React, { useState } from "react";

const SettingsMenu = ({ playerIndex, onChange, onClose }) => {
  const [speed, setSpeed] = useState(2);
  const [shotCooldown, setShotCooldown] = useState(1000);
  const [bulletColor, setBulletColor] = useState("black");

  const handleSave = () => {
    onChange(playerIndex, { speed, shotCooldown, bulletColor });
    onClose(); // Закрытие меню настроек после сохранения
  };

  return (
    <div className="settings-menu">
      <h3>Player {playerIndex + 1} Settings</h3>
      <label>
        Speed:
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </label>
      <label>
        Shot Cooldown (ms):
        <input
          type="number"
          value={shotCooldown}
          onChange={(e) => setShotCooldown(Number(e.target.value))}
        />
      </label>
      <label>
        Bullet Color:
        <input
          type="color"
          value={bulletColor}
          onChange={(e) => setBulletColor(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button> {/* Кнопка закрытия меню */}
    </div>
  );
};

export default SettingsMenu;
