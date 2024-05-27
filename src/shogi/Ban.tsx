import { Koma } from "./global";
export function Ban({
  fieldData,
  shogiBanClickHandler,
  selectedKomaPos,
}: {
  fieldData: (Koma | null)[][];
  shogiBanClickHandler: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  selectedKomaPos: { row: number; col: number } | null;
}) {
  return (
    <div
      onClick={shogiBanClickHandler}
      className="grid grid-cols-9"
      style={{ width: "576px" }}
    >
      {fieldData.map((row, r_i) =>
        row.map((koma, c_i) => (
          <div
            className={`h-16 flex items-center justify-center border-gray-300 ${
              koma?.teban === "gote" ? "transform rotate-180" : ""
            }
			${
        selectedKomaPos?.row === r_i && selectedKomaPos?.col === c_i
          ? "bg-blue-700"
          : "bg-blue-500"
      }
			`}
            data-row={r_i}
            data-col={c_i}
            style={{ width: "64px" }}
          >
            {koma ? koma.type : ""}
          </div>
        ))
      )}
    </div>
  );
}
