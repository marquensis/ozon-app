import React, { useState } from "react";
import styles from './styles.module.css';
import LoginWindow from "../LoginWindow/LoginWindow";

function ShadowView() {
    const [shadowClose, setShadowClose] = useState(true);
    return(
        <div className={styles.shadow} onClick={() => setShadowClose(false)}>
            <LoginWindow window={shadowClose}/>
        </div>
    )
}

export default ShadowView;