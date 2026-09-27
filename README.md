# הצמד ודרג — אתר + מערכת ניהול תוכן

האתר סטטי, ומערכת הניהול (Decap CMS) מאפשרת לערוך מחירים, טלפונים, לוגואים והמלצות
מתוך הדפדפן, בלי לגעת בקוד.

```
index.html            האתר עצמו
content/site.json     התוכן שניתן לעריכה
images/uploads/       לוגואים ותמונות שמעלים דרך הניהול
admin/                מערכת הניהול
api/                  התחברות מאובטחת דרך גיטהאב
```

---

## התקנה — שלב אחר שלב

### 1. העלאת הקבצים לגיטהאב

צרו מאגר חדש ב-[github.com](https://github.com) (למשל `hazmedvedareg`) והעלו אליו את כל
התיקייה הזו. אם אין לכם גיטהאב — זה חינם, ההרשמה לוקחת דקה.

### 2. חיבור ל-Vercel

ב-[vercel.com](https://vercel.com) לחצו **Add New → Project**, בחרו את המאגר, ולחצו **Deploy**.
אין צורך בהגדרות בנייה — האתר יעלה כמו שהוא.

### 3. יצירת אפליקציית גיטהאב לאימות

בגיטהאב: **Settings → Developer settings → OAuth Apps → New OAuth App**

| שדה | מה למלא |
|---|---|
| Application name | Hazmedvedareg CMS |
| Homepage URL | `https://hazmedvedareg.vercel.app` |
| Authorization callback URL | `https://hazmedvedareg.vercel.app/api/callback` |

לחצו **Register**, ואז **Generate a new client secret**. שמרו את שני הערכים:
`Client ID` ו-`Client Secret`.

### 4. הוספת המפתחות ל-Vercel

בפרויקט ב-Vercel: **Settings → Environment Variables**, והוסיפו שניים:

| Name | Value |
|---|---|
| `GITHUB_CLIENT_ID` | ה-Client ID מהשלב הקודם |
| `GITHUB_CLIENT_SECRET` | ה-Client Secret מהשלב הקודם |

אחרי ההוספה לחצו **Redeploy** כדי שייכנסו לתוקף.

### 5. עדכון קובץ ההגדרות

פתחו את `admin/config.yml` והחליפו שתי שורות:

```yml
repo: USER/REPO                          ← שם המשתמש / שם המאגר שלכם
base_url: https://hazmedvedareg.vercel.app    ← הכתובת של האתר
```

### 6. סיימתם

היכנסו ל-`https://hazmedvedareg.vercel.app/admin`, התחברו עם גיטהאב, וערכו.

---

## איך זה עובד בפועל

כל שינוי שתשמרו בניהול נשמר כקובץ במאגר, Vercel בונה את האתר מחדש אוטומטית,
והשינוי עולה לאוויר תוך כדקה.

**מה אפשר לערוך:** מחירי המעמד והמדבקה (מתעדכנים בכל מקום באתר — כרטיסי המחיר,
טופס ההזמנה, הסכום המתחשב והשאלות הנפוצות), מספרי טלפון, לוגואים בקרוסלה, והמלצות
לקוחות כולל דירוג כוכבים ולוגו.

**מה נשאר בקוד:** טקסטים קבועים, עיצוב ותמונות המוצר. אם תרצו לנהל גם אותם,
אפשר להרחיב את `admin/config.yml`.

---

## דברים שכדאי לדעת

- אם `content/site.json` לא נטען מסיבה כלשהי, האתר מציג את התוכן המקורי שמוטמע בקוד.
  כלומר גם תקלה בניהול לא תשבור את האתר.
- מומלץ להפעיל אימות דו־שלבי בחשבון הגיטהאב — הוא המפתח לאתר.
- אל תעלו את ה-`Client Secret` לקוד. הוא נשמר רק במשתני הסביבה ב-Vercel.
- כדי לתת גישה לעוד אדם, הוסיפו אותו כ-Collaborator במאגר בגיטהאב.
