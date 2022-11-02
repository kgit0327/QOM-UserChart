// -----------------------------------------------------
// アプリを開いた時に実行する関数（index.htmlを表示する） *gs関数1
// -----------------------------------------------------
function doGet(e) {
    let page = e.parameter.page;
    if (!page) {
      page = 'index';
    }
    return HtmlService.createTemplateFromFile(page).evaluate();
  }
  // -----------------------------------------------------
  
  // -----------------------------------------------------
  // スプレッドシートアプリからシートを取得する関数 *gs関数2
  // -----------------------------------------------------
  // 第一引数:スプレッドシートID、第二引数:シート名
  function getSheet(ssId, ssName){
    // スプレッドシートを取得
    const ss = SpreadsheetApp.openById(ssId);
    // 指定されたシート名からシートを取得してリターン
    const sheet = ss.getSheetByName(ssName);
    return sheet;
  }
  // -----------------------------------------------------
  
  // -----------------------------------------------------
  // メンバーIDからメンバーの名前を取得する関数 *gs関数3
  // -----------------------------------------------------
  // 引数:照合させるメンバーID
  function getMemberName(val) {
    // 関数getSheet(*gs関数2)を呼び出してスプレッドシート「サンプルマスタ」からシートオブジェクトを取得
    const sheet = getSheet('サンプルマスタのスプレッドシートID', 'シート1');
    // シートの最終行を取得
    const lastRow = sheet.getLastRow();
  
    // シートの2行目から最終行まで繰り返し処理
    for (let i = 2; i <= lastRow; i++) {
      // 1列目のi行目の値を取得し変数memberIdへ格納
      const memberId = sheet.getRange(i, 1).getValue();
      // memberIdがvalと等しければ、2列目i行目の値（memberName）を返す
      if (memberId === val) {
        const memberName = sheet.getRange(i, 2).getValue();
        return memberName;
      }
    }
  }
  // -----------------------------------------------------
  
  // -----------------------------------------------------
  // フォームの入力内容をスプレッドシートへ書き込む関数 *gs関数4
  // 補足）二重サブミットを防ぐためにdoPost(e)を使わない仕様にした
  // -----------------------------------------------------
  // 第一引数:メンバーID、第二引数:メンバー名、第三引数:区分、第四引数:数値、第五引数:内容
  function addData(memberId, memberName, kubun, numVal, content) {
    // 関数getSheet(*gs関数2)を呼び出してスプレッドシート「サンプルテーブル」からシートオブジェクトを取得
    const sheet = getSheet('サンプルテーブルのスプレッドシートID', 'シート1');
    // 登録日として現在の日時を取得する
    const createdDate = new Date();
    // シートの最終行に値を書き込む
    sheet.appendRow([memberId, memberName, kubun, numVal, content, createdDate]);
  
  }