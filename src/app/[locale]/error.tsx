'use client'

export default function Error({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="bg-red">
      <h1>Something went wrong!</h1>
      <button className="btn btn-secondary" onClick={() => reset()}>Try again</button>
    </div>
  )
}