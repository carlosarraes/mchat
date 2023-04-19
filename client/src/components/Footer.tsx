import { Github, Code } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="flex my-2 justify-center items-center text-slate-400">
      <h4>
        <div className="flex gap-4 text-center">
          <a
            href="https://github.com/carlosarraes"
            target="_blank"
            rel="noreferrer"
            className="text-center flex gap-2 hover:underline"
          >
            <Github className="text-4xl" />
            <span className="self-center">/carlosarraes</span>
          </a>
          <div className="self-center">
            <span className="self-center"> | </span>
          </div>
          <a
            href="https://github.com/carlosarraes/mchat"
            target="_blank"
            rel="noreferrer"
            className="text-center flex gap-2 hover:underline"
          >
            <Code className="text-4xl" />
            <span className="self-center">code</span>
          </a>
        </div>
      </h4>
    </footer>
  )
}

export default Footer
