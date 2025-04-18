const UFooter = () => {
  return (
    <footer class="bg-gray-100 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="space-y-4">
          <h3 class="text-xl font-bold">CSPLMS</h3>
          <p class="text-gray-400">Streamline the borrow and return process.</p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>

        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-black">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="/features"
                class="text-gray-400 hover:text-white transition"
              >
                Features
              </a>
            </li>
            <li>
              <a href="/pricing" class="hover:text-white transition text-black">
                Pricing
              </a>
            </li>
            <li>
              <a href="/docs" class="hover:text-white transition text-black">
                Documentation
              </a>
            </li>
            <li>
              <a href="/blog" class="hover:text-white transition text-black">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div class="space-y-4 text-black">
          <h4 class="text-lg font-semibold">Legal</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="/privacy"
                class="text-gray-400 hover:text-white transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                class="text-gray-400 hover:text-white transition"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/cookies"
                class="text-gray-400 hover:text-white transition"
              >
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Contact Us</h4>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center space-x-2">
              <i class="fas fa-envelope"></i>
              <span>csplms@gmail.com</span>
            </li>
            <li class="flex items-center space-x-2">
              <i class="fas fa-map-marker-alt"></i>
              <span>Pokhara-29</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        <p>&copy; 2025 CSPLMS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default UFooter;
