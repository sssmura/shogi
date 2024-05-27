import {
  Koma,
  typeToNariType,
  typeToMoveDistance,
  direction,
  typeToMoveDirection,
} from "./global";
import { useState } from "react";
import { Ban } from "./Ban";

type Teban = "sente" | "gote";
export function Shogi({
  startFieldData,
}: {
  startFieldData: (Koma | null)[][];
}) {
  const [teban, setTeban] = useState<Teban>("sente");
  const [fieldData, setFieldData] = useState(startFieldData);
  const [selectedKomaPos, setSelectedKomaPos] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const motiGoma: Record<Teban, Koma[]> = {
    sente: [],
    gote: [],
  };

  //ゲームのメイン処理関数（ユーザーの将棋盤上のクリックを処理する関数）
  function ShogiBanClickHandler(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const target = e.target as HTMLDivElement;
    //clickした場所のrowとcol
    const [row, col] = [
      Number(target.dataset.row),
      Number(target.dataset.col),
    ] as [number, number];

    //選択されたコマがない場合でのクリック処理
    if (selectedKomaPos === null) {
      const koma = fieldData[row][col];
      if (koma === null) {
        return;
      }
      if (koma.teban !== teban) {
        return;
      }
      setSelectedKomaPos({ col, row });
      return;
    }

    //選択されたコマがある場合でのクリック処理
    //選択されたコマと同じ座標の場合、選択を解除
    if (selectedKomaPos.row === row && selectedKomaPos.col === col) {
      setSelectedKomaPos(null);
      return;
    }
    //ここまでの処理でrowとcolは移動先の座標となる、ここから移動可能かの判定
    const from = selectedKomaPos;
    const to = {
      row,
      col,
    };
    //選択中の駒
    const selectedKoma = fieldData[selectedKomaPos.row][
      selectedKomaPos.col
    ] as Koma;
    //移動チェック
    if (
      fieldData[to.row][to.col] !== null &&
      (fieldData[to.row][to.col] as Koma).teban === teban
    ) {
      //移動先が自分の駒の場合
      return;
    }
    //移動可能かの判定(可能な場合、trueもしくは取得できるコマを返す)
    const chaekResult: boolean | Koma = checkMove(
      selectedKoma,
      from,
      to,
      fieldData
    );
    console.log(chaekResult);
    if (chaekResult === true) {
      //移動可能な場合

      if (
        (teban === "sente" && to.row <= 2) ||
        (teban === "gote" && to.row >= 6)
      ) {
        if (selectedKoma.type in typeToNariType) {
          const isNaru = confirm("成りますか？");
          if (isNaru) {
            selectedKoma.type = typeToNariType[selectedKoma.type];
          }
        }
      }
      const newFieldData = fieldData.map((row) => [...row]);
      newFieldData[to.row][to.col] = selectedKoma;
      newFieldData[selectedKomaPos.row][selectedKomaPos.col] = null;
      setFieldData(newFieldData);
      setSelectedKomaPos(null);
      setTeban(teban === "sente" ? "gote" : "sente");
      return;
    }
    if (chaekResult !== false) {
      //取得した場合
      if (
        (teban === "sente" && to.row <= 2) ||
        (teban === "gote" && to.row >= 6)
      ) {
        if (selectedKoma.type in typeToNariType) {
          const isNaru = confirm("成りますか？");
          if (isNaru) {
            selectedKoma.type = typeToNariType[selectedKoma.type];
          }
        }
      }
      const newFieldData = fieldData.map((row) => [...row]);
      const getKoma = chaekResult;
      getKoma.teban = teban;
      motiGoma[teban].push(getKoma);
      newFieldData[to.row][to.col] = selectedKoma;
      newFieldData[selectedKomaPos.row][selectedKomaPos.col] = null;
      setFieldData(newFieldData);
      setSelectedKomaPos(null);
      setTeban(teban === "sente" ? "gote" : "sente");
      return;
    }
  }
  return (
    <Ban
      fieldData={fieldData}
      shogiBanClickHandler={ShogiBanClickHandler}
      selectedKomaPos={selectedKomaPos}
    />
  );
}

function checkMove(
  koma: Koma,
  from: { row: number; col: number },
  to: { row: number; col: number },
  fieldData: (Koma | null)[][]
): boolean | Koma {
  const d_row = to.row - from.row;
  const d_col = to.col - from.col;
  if (koma.type === "Kei") {
    const d_vec = [d_row, d_col];
    const directionKey = direction[koma.teban][JSON.stringify(d_vec)];
    if (!directionKey) return false;
    if (typeToMoveDirection[koma.type].includes(directionKey)) {
      const komaOrNull = fieldData[to.row][to.col];
      console.log(komaOrNull);
      if (komaOrNull === null) return true;
      if (komaOrNull.teban === koma.teban) return false;
      return komaOrNull;
    }
    return false;
  }

  const distance = Math.max(Math.abs(d_row), Math.abs(d_col));
  const moveDistance = typeToMoveDistance[koma.type];
  //移動距離がコマの移動可能距離を超えている場合
  if (distance > moveDistance) {
    return false;
  }
  let directionVector = [d_row, d_col];
  if (distance > 1) {
    directionVector = [d_row / distance, d_col / distance];
  }
  //そもそも存在する移動方向かの判定
  console.log(directionVector);
  const directionKey = direction[koma.teban][JSON.stringify(directionVector)];
  if (!directionKey) {
    return false;
  }
  //選択中のコマにとって移動可能な方向かの判定
  if (!typeToMoveDirection[koma.type].includes(directionKey)) {
    return false;
  }
  //移動までの経路にコマが存在するかの判定
  for (let i = 1; i <= Math.max(Math.abs(d_row), Math.abs(d_col)); i++) {
    const [r, c] = [
      from.row + (d_row === 0 ? 0 : (d_row / Math.abs(d_row)) * i),
      from.col + (d_col === 0 ? 0 : (d_col / Math.abs(d_col)) * i),
    ];
    const komaOrNull = fieldData[r][c];
    if (komaOrNull === null) {
      continue;
    }
    if (komaOrNull.teban === koma.teban) {
      return false;
    }
    if (i === Math.max(Math.abs(d_row), Math.abs(d_col))) {
      if (komaOrNull === null) {
        return true;
      } else {
        return komaOrNull;
      }
    }
    if (komaOrNull !== null) {
      return false;
    }
  }
  return true;
}
