import React from 'react'
import Logo from '../../assets/logo.jpg'

export default function Footer() {
  return (
    

    <footer class="bg-black">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src={Logo} class="h-8" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Glorius Vision Uni</span>
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="/about" class="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="/past-questions" class="hover:underline me-4 md:me-6">Past Questions</a>
                    </li>
                    <li>
                        <a href="/faqs" class="hover:underline me-4 md:me-6">FAQs</a>
                    </li>
                    <li>
                        <a href="/contact" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© <a href="https://flowbite.com/" class="hover:underline">GVU</a>. All Rights Reserved.</span>
        </div>
    </footer>
  )
}
