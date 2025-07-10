# Parsian IT Test Project

This repository contains a test project developed for the Parsian IT company. The project demonstrates advanced React, TypeScript, and UI/UX skills, including dynamic form building, drag-and-drop, state management, and modern component design. **This is not a production system, but a technical test and showcase.**

---

## 📝 Project Overview

- **Dynamic Form Builder**: Create, edit, and preview custom forms with various input types (text, number, dropdown, etc.).
- **Drag-and-Drop**: Reorder form fields using a smooth drag-and-drop interface (powered by dnd-kit and Framer Motion).
- **Live Preview**: Instantly preview the form as you build it, with real-time validation and error display.
- **Field Editing**: Edit or delete any field using dialogs, with validation and confirmation.
- **State Management**: Uses Zustand for global state and react-hook-form for form state and validation.
- **Modern UI**: Built with shadcn/ui, custom components, and responsive design.

---

## 🛠️ Tech Stack

- **React** (with TypeScript)
- **Zustand** (state management)
- **react-hook-form** (form state & validation)
- **zod** (schema validation)
- **@dnd-kit/core** (drag-and-drop)
- **Framer Motion** (animations)
- **shadcn/ui** (UI components)
- **Tailwind CSS** (styling)
- **Vite** (build tool)

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── common/
│   │   ├── draggable/        # Drag-and-drop logic (SortableDraggable, etc.)
│   │   ├── hocForm/          # HOCs for form fields
│   │   ├── image/            # Image components
│   │   ├── loading/          # Loading spinners
│   │   ├── skeleton/         # Skeleton loaders
│   │   ├── toaster/          # Toast notifications
│   ├── context/              # Context types
│   ├── forms/                # Form management hooks
│   ├── providers/            # React context providers
│   ├── ui/                   # UI components (Button, Input, Select, etc.)
├── data/                     # Enums, mock data
├── lib/
│   ├── hoc/                  # HOCs
│   ├── hooks/                # Custom hooks
│   ├── schema/               # Zod schemas
│   ├── services/             # Axios, API requests
│   ├── store/                # Zustand store (formStore)
│   ├── typescript/           # Global types
│   └── utils.ts              # Utility functions
├── pages/
│   ├── home/
│   │   ├── _component/
│   │   │   ├── FormBuilder.tsx      # Form builder UI
│   │   │   ├── FormPreview.tsx      # Live form preview
│   │   │   ├── EditFieldDialog.tsx  # Edit dialog for fields
│   │   │   ├── ConfirmDeleteFieldDialog.tsx # Delete confirmation dialog
│   │   │   └── useFormPreview.ts    # Preview logic
│   │   └── index.tsx                # Home page
│   └── index.tsx                    # App entry
├
├── index.css                # Global styles
├── main.tsx                 # App bootstrap
└── vite.config.ts           # Vite config
```

---

## 🚀 Features

- **Form Builder**: Add, edit, delete, and reorder fields (text, number, dropdown, etc.)
- **Drag-and-Drop**: Reorder fields visually with a drag handle
- **Dialogs**: Edit and delete dialogs for each field, with validation and confirmation
- **Live Preview**: See the form update in real time as you build
- **Validation**: Field-level validation using zod and react-hook-form
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Consistent, accessible, and visually appealing

---

## 🧑‍💻 For Developers

### Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
2. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
3. **Build for production**
   ```bash
   pnpm build
   # or
   npm run build
   # or
   yarn build
   ```

### Environment

- No special environment variables are required for local development.

### Testing

- This project is a technical test and does not include automated tests.

---

## 📝 Notes

- This project is for technical evaluation and demonstration purposes for Parsian IT.
- The codebase is modular and easy to extend for production use.
- All UI/UX, state management, and drag-and-drop logic is custom and can be adapted for real-world projects.

---

## 👨‍💻 Authors

- **Test Project for Parsian IT**
- Developed by: [saman dor-emami]

---

## 📄 License

This project is proprietary and for evaluation purposes only.
