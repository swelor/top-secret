const books = [
    {
        id: 1,
        title: "letters",
        category: "thoughts",
        cover: ":)",
        pages: [
            { id: 1, content: "letter content goes here..." },
        ]
    },
    {
        id: 2,
        title: "journal",
        category: "journal",
        cover: "o_o",
        pages: [
            { id: 1, content: "journal goes here..." },
        ]
    },
    {
        id: 3,
        title: "from her",
        category: "her letters",
        cover: "<3",
        pages: []                       // firestore fills this, leave empty
    },
]

export default books

