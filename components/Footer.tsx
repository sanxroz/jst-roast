import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 flex justify-end pr-4 pb-2">
      <div className="px-5 text-[#efece6] py-2 border border-solid border-[#00000033] rounded-full bg-[#ffffff26] shadow-[inset_0_2px_0_0_rgb(255,255,255,10%)] hover:shadow">
        <a
          href="https://twitter.com/SanxRoz"
          target="_blank"
          className="div-madeby w-inline-block"
        >
          <div className="text-badge">Made by @SanxRoz</div>
        </a>
      </div>
    </footer>
  );
}
