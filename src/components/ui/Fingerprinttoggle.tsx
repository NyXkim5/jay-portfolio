// Orange-themed fingerprint scanner toggle for right rail HUD - NO STATUS TEXT
interface FingerprintToggleProps {
  isActive: boolean;
  onClick: () => void;
}

const FingerprintToggle = ({ isActive, onClick }: FingerprintToggleProps) => {
  return (
    <button
      onClick={onClick}
      className="fingerprint-container"
      aria-label={isActive ? "Hide status HUD" : "Show status HUD"}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        className={`fingerprint-svg ${isActive ? "active" : ""}`}
      >
        <path
          d="M11.987 4.571q2.636 0 4.973 1.138q2.338 1.137 3.894 3.268q.136.167.083.314q-.053.145-.183.232t-.282.076t-.264-.176q-1.414-1.989-3.595-3.036T11.986 5.34q-2.425 0-4.569 1.067T3.854 9.423q-.131.187-.292.193q-.162.005-.293-.1q-.108-.087-.13-.217t.069-.272q1.569-2.086 3.87-3.271q2.3-1.185 4.909-1.185m0 2.35q3.336 0 5.732 2.223t2.396 5.506q0 1.209-.853 2.019q-.854.81-2.081.81q-1.217 0-2.101-.81t-.884-2.019q0-.863-.64-1.465q-.641-.6-1.531-.6q-.905 0-1.557.596q-.652.595-.652 1.469q0 2.483 1.475 4.146q1.476 1.664 3.751 2.314q.178.057.248.19t.02.284q-.05.133-.162.239t-.317.056q-2.523-.65-4.154-2.56t-1.63-4.669q0-1.211.88-2.023t2.1-.812t2.078.812t.86 2.023q0 .874.658 1.47t1.552.596t1.533-.601t.638-1.465q0-2.949-2.17-4.957q-2.168-2.009-5.18-2.009T6.831 9.7t-2.154 4.945q0 .61.141 1.524t.548 2.115q.055.167-.003.294q-.06.127-.22.202t-.302.005q-.139-.07-.195-.228q-.394-1.033-.566-1.976t-.172-1.93q0-3.284 2.384-5.506t5.696-2.223m.037-4.8q1.575 0 3.076.388q1.5.387 2.903 1.112q.205.106.233.252t-.027.283t-.202.198q-.146.062-.3-.025q-1.306-.733-2.747-1.086q-1.44-.352-2.945-.352q-1.48 0-2.899.375q-1.419.376-2.752 1.063q-.103.067-.255.024t-.214-.186t-.04-.276q.021-.133.163-.22q1.381-.769 2.906-1.16t3.1-.39m.001 7.245q2.286 0 3.913 1.524t1.627 3.76q0 .173-.106.279t-.28.106q-.141 0-.263-.106q-.12-.106-.12-.279q0-1.914-1.417-3.215t-3.355-1.3t-3.349 1.3t-1.41 3.213q0 2.066.719 3.488t2.069 2.882q.15.153.121.305t-.121.244q-.112.112-.263.122t-.283-.122q-1.417-1.511-2.215-3.133t-.797-3.785q0-2.235 1.622-3.76t3.908-1.523m-.05 4.9q.172 0 .28.115q.11.115.11.269q0 1.934 1.378 3.172t3.237 1.238q.246 0 .521-.025t.556-.075q.148-.031.253.043t.155.245q.05.153-.056.267t-.268.164q-.276.067-.595.109q-.318.04-.566.04q-2.168 0-3.776-1.472q-1.609-1.472-1.609-3.706q0-.154.105-.27q.105-.114.276-.114"
          className="fingerprint-path"
        ></path>
      </svg>
      <div className="scan-line"></div>
      <div className="ripple1"></div>
      <div className="ripple2"></div>
      <div className="glow"></div>

      <style>{`
        .fingerprint-container {
          position: relative;
          width: 48px;
          height: 48px;
          cursor: pointer;
          animation: fp-pulse 2s infinite ease-in-out;
        }

        .fingerprint-svg {
          width: 100%;
          height: 100%;
          color: #f97316;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .fingerprint-path {
          fill: rgba(249, 115, 22, 0.3);
          stroke: #f97316;
          stroke-width: 0.5px;
          stroke-dasharray: 100;
          stroke-dashoffset: 0;
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to right, transparent, #fb923c, transparent);
          opacity: 0;
          box-shadow: 0 0 10px rgba(251, 146, 60, 0.8);
          z-index: 10;
        }

        .ripple1, .ripple2 {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 50%;
          border: 2px solid #f97316;
          opacity: 0;
          transform: scale(0);
        }

        .glow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
          opacity: 0;
        }

        .fingerprint-container:hover .fingerprint-svg {
          transform: scale(1.1);
        }

        .fingerprint-container:hover .fingerprint-path {
          stroke: #fb923c;
          fill: rgba(251, 146, 60, 0.5);
          animation: fp-draw 4s infinite linear;
        }

        .fingerprint-container:hover .scan-line {
          animation: fp-scan 1.5s infinite linear;
          opacity: 0.7;
        }

        .fingerprint-container:active .fingerprint-svg,
        .fingerprint-svg.active {
          color: #fb923c;
          transform: scale(1.05) rotate(15deg);
          animation: fp-spin 0.5s ease-out;
        }

        .fingerprint-container:active .fingerprint-path,
        .active .fingerprint-path {
          fill: rgba(251, 146, 60, 0.7);
          stroke: #fb923c;
          animation: fp-draw-fast 0.5s linear;
        }

        .fingerprint-container:active .ripple1 {
          animation: fp-ripple 0.6s ease-out;
        }

        .fingerprint-container:active .ripple2 {
          animation: fp-ripple 0.8s ease-out 0.2s;
        }

        .fingerprint-container:active .glow,
        .fingerprint-svg.active ~ .glow {
          box-shadow: 0 0 30px rgba(249, 115, 22, 0.8);
          animation: fp-glow 0.6s ease-out;
        }

        @keyframes fp-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes fp-scan {
          0% {
            transform: translateY(-3px);
            opacity: 0;
          }
          5% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          95% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(51px);
            opacity: 0;
          }
        }

        @keyframes fp-ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes fp-glow {
          0% { opacity: 0; }
          50% { opacity: 0.7; }
          100% { opacity: 0; }
        }

        @keyframes fp-spin {
          0% { transform: scale(1.05) rotate(0deg); }
          50% { transform: scale(1.1) rotate(15deg); }
          100% { transform: scale(1.05) rotate(0deg); }
        }

        @keyframes fp-draw {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes fp-draw-fast {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </button>
  );
};

export default FingerprintToggle;
