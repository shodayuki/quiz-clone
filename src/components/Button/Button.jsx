import React from 'react';
import './Button.css';

const Button =(props) => {
  let {onClickHander } = props;

  // onClickHanderに関数以外の値がセットされていたら、
  // ボタンクリック時にエラーを出さないために何も中身のない
  // 関数を実行する
  if (typeof onClickHander !== 'function') {
    onClickHander = () => {};
  }

  return (
    <div
      className="Button"
      onClick={onClickHandler}
    >
      {props.children}
    </div>
  );
}

export default Button;