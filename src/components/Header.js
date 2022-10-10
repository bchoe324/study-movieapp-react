import { Link } from "react-router-dom";
import styles from "../components/Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.h1}>
        <Link to="/">Movie App</Link>
      </h1>
    </div>
  );
}
export default Header;
