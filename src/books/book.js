export default function Book({ book, onOpen }) {
    return (
        <div className = "book" onClick={() => onOpen(book)}>
            <span>{book.cover}</span>
            <p>{book.title}</p>
        </div>
    )
}
