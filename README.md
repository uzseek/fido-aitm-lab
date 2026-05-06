# FIDO AiTM Lab

FIDO / Passkey と Adversary-in-the-Middle（AiTM）攻撃を学習・検証するためのハンズオン用Labです。

このリポジトリでは以下を体験できます。

- パスワード認証
- TOTPベースのMFA
- Passkey / WebAuthn 登録
- Passkey / WebAuthn ログイン
- Password + TOTP に対する AiTM relay 攻撃
- MFA突破後の session hijacking
- なぜ Passkey が phishing-resistant なのか

---

# 構成

## 正規アプリケーション（正規サイト）

ディレクトリ:

```text
/app
````

機能:

* パスワードログイン
* TOTP MFA
* Passkey登録
* Passkey認証
* セッションベース dashboard

URL:

```text
http://localhost:3000
```

---

## 攻撃者アプリケーション（偽サイト）

ディレクトリ:

```text
/attacker
```

再現している内容:

* 資格情報フィッシング
* Password relay
* TOTP relay
* Session hijacking
* 窃取sessionによる dashboard access

URL:

```text
http://localhost:4000
```

---

# デモ内容

## Password + TOTP

被害者が偽サイトへ:

* username
* password
* TOTP code

を入力すると、
攻撃者がそれらを正規サイトへ relay します。

MFA突破後、
攻撃者は窃取した session cookie を利用して
被害者 dashboard へアクセスできます。

これにより:

```text
TOTP は phishing-resistant ではない
```

ことを確認できます。

---

## Passkey / WebAuthn

Passkey は origin に紐づいて署名を行います。

そのため:

```text
偽サイト → 正規サイト
```

への単純な relay が成立しません。

今後、
Passkey relay が失敗するデモを追加予定です。

---

# 起動方法

```bash
docker compose up --build
```

---

# アクセス先

## 正規サイト

```text
http://localhost:3000
```

## 偽サイト

```text
http://localhost:4000
```

---

# 現在実装済み

* Password login
* TOTP MFA
* Passkey registration
* Passkey login
* Password relay
* TOTP relay
* Session hijacking
* attacker-side dashboard access

---

# 今後追加予定

* Passkey relay failure demonstration
* Origin binding visualization
* AiTM vs Passkey comparison flow
* 攻撃フロー可視化

---

# 注意

このリポジトリは:

* セキュリティ学習
* 認証技術理解
* 研究
* 教育

を目的としています。

許可のないシステムに対して使用しないでください。


