const showSkeleton = () => {
  const html = `
    <div class="bg-gray-200 p-4 sm:p-6 text-center rounded-lg animate-pulse">
      <div class="h-5 w-24 bg-gray-300 rounded mx-auto mb-2"></div>
      <div class="h-12 w-12 sm:h-16 sm:w-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
      <div class="h-8 w-32 sm:w-40 bg-gray-300 rounded mx-auto mb-1"></div> 
      <div class="h-4 w-20 bg-gray-300 rounded mx-auto mb-2"></div> 
      <div class="h-3 w-16 bg-gray-300 rounded mx-auto mb-1"></div>
      <div class="h-1 bg-gray-300 rounded-full mx-auto mb-1">
        <div class="h-full bg-gray-400 rounded-full w-3/5"></div>
      </div>
      <div class="h-3 w-20 bg-gray-300 rounded mx-auto mb-1"></div>
      <div class="h-3 w-24 bg-gray-300 rounded mx-auto mb-1"></div>
      <div class="h-3 w-16 bg-gray-300 rounded mx-auto mb-1"></div>
    </div>
  `;
  return html;
};

export default showSkeleton;
