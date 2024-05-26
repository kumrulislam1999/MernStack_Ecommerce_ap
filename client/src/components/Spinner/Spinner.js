import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Spinner({ path = "login" }) {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  /* ==== Use Effect ==== */
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 && navigate(`${path}`, { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div className="spinnerBox">
        <div>
          <h3>Redirecting to you in {count} second</h3>
          <div className="pl">
            <div className="pl__bars">
              <div className="pl__bar">
                <div className="pl__bar-s" />
                <div className="pl__bar-t" />
                <div className="pl__bar-l" />
                <div className="pl__bar-r" />
              </div>
              <div className="pl__bar">
                <div className="pl__bar-s" />
                <div className="pl__bar-t" />
                <div className="pl__bar-l" />
                <div className="pl__bar-r" />
              </div>
              <div className="pl__bar">
                <div className="pl__bar-s" />
                <div className="pl__bar-t" />
                <div className="pl__bar-l" />
                <div className="pl__bar-r" />
              </div>
              <div className="pl__bar">
                <div className="pl__bar-s" />
                <div className="pl__bar-t" />
                <div className="pl__bar-l" />
                <div className="pl__bar-r" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
