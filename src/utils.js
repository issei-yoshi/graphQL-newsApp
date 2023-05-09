const jwt = require("jsonwebtoken");
APP_SECRET = "Graphql-is-aw3some";

// トークンを復号するための関数
function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

// ユーザーIDを取得するための関数
function getUserId(req, authToken) {
  if(req) {
    // ヘッダーを確認して認証権限があるか否かを調べる
    const authHeader = req.headers.authorization;
    // 権限があった場合
    if(authHeader) {
      const token = authHeader.replace("Bearer", "");
      if(!token) {
        throw new Error("トークンが見つかりませんでした");
      }
      // トークンを結合する
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("認証権限がありません");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
