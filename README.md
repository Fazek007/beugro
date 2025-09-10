# Domain Decision App

Egy egyszerű Node.js + Express + MongoDB alkalmazás, amely véletlenszerű döntéseket és számokat generál egy megadott domain alapján.  
A döntés és a generált szám (ha van) elmentésre kerül az adatbázisba, és ugyanarra a domainre mindig ugyanazt adja vissza.

## Technológia
- Node.js + Express (backend)
- MongoDB + Mongoose (perzisztencia)
- EJS templating (frontend)
- Jest (tesztelés)
- Docker + Docker Compose (konténerizáció)

## Telepítés és futtatás

### 1. Klónozás
```bash
git clone https://github.com/Fazek007/beugro
cd project-name
```

### 2. Függőségek telepítése
```bash
npm install
```

### 3. Környezeti változók
```
MONGO_URI=mongodb://localhost:27017/domain-decision
SESSION_SECRET=your-secret
PORT=3000
```

### 4. Indítás
```bash
npm start
```

### 5. Tesztek futtatása
```bash
npm test
```

### 6. Docker
Build és futtatás Dockerrel:

```bash
docker-compose up --build
```

Ez elindítja a Node alkalmazást és a MongoDB-t is.

---

## API-végpontok

### `GET /`
- **Leírás:**  
  Megjeleníti az űrlapot, ahol a felhasználó megadhat egy domaint.
- **Válasz:**  
  HTML oldal (`views/form.ejs`).

---

### `POST /submit`
- **Leírás:**  
  Beállítja a megadott domaint a session-ben, majd átirányít a `/decision` végpontra.
- **Kérés:**
  - **Body (application/x-www-form-urlencoded):**
    ```json
    {
      "domain": "test.com"
    }
    ```
- **Válasz:**  
  HTTP 302 Redirect → `/decision`.

---

### `GET /decision`
- **Leírás:**  
  Lekéri vagy újonnan legenerálja a döntést és a számot az adott domainhez.  
  Ha a domain korábban már létezett, mindig ugyanazt adja vissza.
- **Kérés:**
  - **Session:**  
    `domain` kulcs kötelező (különben redirect `/`-re).
- **Válasz (HTML render – `views/decision.ejs`):**  
  - `decision` (boolean) – a véletlen döntés
  - `number` (szám vagy null) – a hozzárendelt szám
  - `formattedDate` (string vagy null) – generálás időpontja
  - `domain` (string) – az aktuális domain

**Példa válasz JSON-ban:**
```json
{
  "decision": true,
  "number": 2,
  "formattedDate": "01/01/2024 12:00:00",
  "domain": "test.com"
}
```

---

## Tesztelés
- `randomUtils` egységtesztek a véletlenszám-logikára
- `randomGenerator` middleware tesztek mockolt DB-vel

Futtatás:
```bash
npm test
```

---
