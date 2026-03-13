# Note

## app module

### 1.Concept

#### Component

- selector: which element on the screen will be replaced by the component

- selector have to use at least one dash to separate the words, to not conflict with the html tags

- template means the content of the component

- only very very short templates, we can use inline template, otherwise use templateUrl

- standalone: true, means the component is standalone. When it's set to false, it will be treated as a module component

#### Module vs Standalone Component

declarations = 「宣告」這個元件屬於這個模組

exports = 「暴露」這個元件給外部使用

沒有 exports，即使你 import 了 SharedModule，也看不到 CardComponent

```text
📦 AppModule (根模組)
│
│  bootstrap: [AppComponent] ← 應用程式啟動入口
│
├── declarations (擁有的元件)
│   ├── 🟢 AppComponent          (standalone: false)
│   ├── 🟢 HeaderComponent       (standalone: false)
│   └── 🟢 UserComponent         (standalone: false)
│
└── imports (匯入的模組)
    ├── 📦 BrowserModule          (Angular 內建，提供 DatePipe 等)
    │
    ├── 📦 SharedModule ─────────────────────────────────────┐
    │   │                                                    │
    │   ├── declarations                                     │
    │   │   └── 🟢 CardComponent  (standalone: false)        │
    │   │                                                    │
    │   └── exports: [CardComponent] ← 公開給外部使用 ────────┘
    │
    └── 📦 TasksModule ──────────────────────────────────────┐
        │                                                    │
        ├── declarations                                     │
        │   ├── 🟢 TasksComponent    (standalone: false)     │
        │   ├── 🟢 TaskComponent     (standalone: false)     │
        │   └── 🟢 NewTaskComponent  (standalone: false)     │
        │                                                    │
        ├── exports: [TasksComponent] ← 公開給 AppModule ────┘
        │
        └── imports
            ├── 📦 CommonModule   (提供 NgIf、NgFor 等)
            ├── 📦 FormsModule    (提供 ngModel 雙向綁定)
```

#### @for vs \*ngFor(Old)

#### @if vs \*ngIf(Old)

<br>

### 2.Property binding

Purpose: parent to child

`<app-user
        [user]="user"
        [selected]="user.id === selectedUserId"
      />`

<br>

### 3.Event binding

Purpose: child to parent

$event is the default event variable

`<app-user
          (select)="onSelectUser($event)"
      />`

<br>

## user module

### 1.Zone.js vs Signals

| 特性     | 傳統機制 (Zone.js + Dirty Checking)                                          | 新機制 (Signals)                                             |
| -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 檢測範圍 | 組件樹級別。只要發生事件（如點擊），Angular 通常會從根部開始檢查整個組件樹。 | 原子級別。直接定位到受影響的 DOM 節點。                      |
| 精準度   | 較低。即使只有一個數字變了，可能也要重新檢查幾十個組件。                     | 極高（Fine-grained）。只更新與該 Signal 綁定的特定 UI 片段。 |
| 性能開銷 | 較高，隨著應用規模擴大，檢查負擔會增加。                                     | 較低，跳過了不必要的檢查邏輯。                               |

<br>

### 2.「傳統變數 + Getter」轉向「Signal + Computed」的核心進化

#### A. 傳統屬性定義

##### 宣告

` selectedUser = DUMMY_USERS[randomIndex];`

##### 私有變數

only available in this class cannot be accessed in template:

` private selectedUser = DUMMY_USERS[randomIndex];`

##### getter

when using getter, you use it like a property, not a method, which means you can use it in template without parentheses

```typescript
get imagePath() {
  return `assets/users/${this.selectedUser.avatar}`;
}
```

##### 重新賦值

`this.selectedUser = DUMMY_USERS[randomIndex];`

#### B. 新版signal屬性定義

##### 宣告

`selectedUser_new = signal(DUMMY_USERS[randomIndex]);`

##### computed

only compute the image path when the Signal used inside changes

```typescript
imagePath = computed(() => `assets/users/${this.selectedUser_new().avatar}`);
```

##### 重新賦值

signal set method is used to update the value of the signal

this.selectedUser_new.set(DUMMY_USERS[randomIndex]);

<br>

### 3. Interface vs Type

outsource type: 將type移動到model中

model.ts專門用來定義資料結構

most of the time,interface and type are interchangeable, but in Angular project we use "interface" more often

`type User = {
 id: string;
 avatar: string;
 name: string;
 }`

interface can only define object type but type can define any type

`interface User {
  id: string;
  avatar: string;
  name: string;
}`

<br>

### 4. @Input (父傳子Data In) vs @Output (子傳父Event Out)

#### 舊版

! 是 TypeScript 的「確定賦值斷言」，告訴編譯器：「雖然我現在沒給它初始值，但我保證 Angular 在執行時一定會透過 Input 給它值，你別擔心。」

`@Input({ required: true }) selected!: boolean;`

EventEmitter 是一個發射器，專門用來「廣播」事件。 <string> 代表這個事件發射出去時，會夾帶一個 string 型態的資料（通常是 user.id）

`@Output() select = new EventEmitter<string>();`

`this.select.emit(this.user.id);`

#### 新版

input as a signal (function)

- <> is a typescript thing, eg <T> is a generic type, T is a placeholder for a type

- If it is required, you can't set the initial value, you have to "set it" in the template

- You can't change the value of the input, you have to set it in the parents' template

`avatar = input.required<string>();`

`name = input.required<string>();`

Output

- Notice that output doesn't create a signal like input, it is an EventEmitter // the template still use the same way

`select_new = output<string>();`

`this.select_new.emit(this.user.id);`

## Tasks module

### 1. ! ? 的使用

- ! 我知道這個變數現在看起來沒給初始值，但我保證它在使用前一定會被賦值，你不要報錯
- ? 當你寫 name?: string 時，這代表 name 的類型實際上是 string | undefined

<br>

### 2. new vs. Injection(動作)

- new: `private service = new TasksService()`的話，每個 Component 都會擁有一份全新的、獨立的 TasksService 實體

- Injection: 與其自己手動 new，不如叫 Angular 幫你 new， Angular 預設會以 「單例模式 (Singleton)」 運作。也就是說，不論你有多少個組件需要這個 Service，Angular 都只會建立 「同一個」 實體並分發給所有人。

<br>

### 3. Dependency Injection 依賴注入(完整的設計模式名稱)

- 不需要去管 Service 是怎麼被產生的，你只需要在組件的 constructor 或使用 inject() 函式宣告：「我需要 TasksService 種類的東西」。

- TasksService 就是組件 A 的「依賴」。沒有它，組件 A 就無法正常運作。

```
// 寫法 A：現代常用的 inject 函式

private tasksService = inject(TasksService);

// 寫法 B：傳統的 Constructor 注入

constructor(private tasksService: TasksService) {}
```

<br>

### 4. "private" placement

```
//private placement 1:
private tasksService: TasksService;

constructor( tasksService: TasksService) {
  this.tasksService = tasksService;
}

//private placement 2: shortcut by Angular, will automatically create a property with the same name

constructor(private tasksService: TasksService) {}
```

### 5. service

- service is a class that provides a way to manage data and functionality.
- @Injectable: tells Angular that this class should be injected into other services or components

### 6. ngModel

`[(ngModel)]="xxx"`

- 必須匯入 FormsModule
- 如果 ngModel 是用在一個 `<form> `標籤內，該表單控制元件必須加上 name 屬性
- when using signal with [(ngModel)], you don't need () in the template
