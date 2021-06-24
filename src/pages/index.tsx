import Link from 'next/link'
import Button from '@components/ui/Button'

export default function Index(): JSX.Element {
  return (
    <main>
      <div>
        Index page -
        <Link href="/home">
          <Button text="To home page" />
        </Link>
      </div>
    </main>
  )
}
