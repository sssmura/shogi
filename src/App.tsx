import { Shogi } from "./shogi";
import { startFieldData } from "./shogi/global";
export default function App() {
  return (
    <div>
      <Shogi startFieldData={startFieldData} />
    </div>
  );
}
