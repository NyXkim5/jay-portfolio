// src/components/ui/Keypad.tsx
import "./keypad.css";

const Keypad = () => {
  return (
    <div
      className="js-keypad js-keypad--orange"
      aria-label="Jay Kim Design macro pad"
    >
      {/* Base plate */}
      <div className="keypad__base" aria-hidden="true">
        <img
          src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86"
          alt=""
        />
      </div>

      {/* Left single key – JAY */}
      <button
        type="button"
        className="key keypad__single keypad__single--left"
        aria-label="Jay"
      >
        <span className="key__mask">
          <span className="key__content">
            <span className="key__text">JAY</span>
            <img
              src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
              alt=""
            />
          </span>
        </span>
      </button>

      {/* Right single key – KIM */}
      <button type="button" className="key keypad__single" aria-label="Kim">
        <span className="key__mask">
          <span className="key__content">
            <span className="key__text">KIM</span>
            <img
              src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
              alt=""
            />
          </span>
        </span>
      </button>

      {/* Long key – DESIGN */}
      <button type="button" className="key keypad__double" aria-label="Design">
        <span className="key__mask">
          <span className="key__content">
            <span className="key__text">__DESIGN</span>
            <img
              src="https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86"
              alt=""
            />
          </span>
        </span>
      </button>
    </div>
  );
};

export default Keypad;
