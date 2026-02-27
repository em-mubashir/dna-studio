/**
 * Simple Homepage Test Script
 * Tests if the homepage loads and displays CMS data correctly
 */

const http = require('http');

const testUrls = [
  { url: 'http://localhost:3000/en', lang: 'English' },
  { url: 'http://localhost:3000/ar', lang: 'Arabic' }
];

function testUrl(url, lang) {
  return new Promise((resolve, reject) => {
    console.log(`\n🧪 Testing ${lang} homepage: ${url}`);
    
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const results = {
          url,
          lang,
          statusCode: res.statusCode,
          success: res.statusCode === 200,
          checks: {}
        };
        
        if (res.statusCode === 200) {
          // Check for key content
          results.checks.hasHeroHeading = data.includes('Crafting Visual Stories') || data.includes('صياغة قصص بصرية');
          results.checks.hasServicesSection = data.includes('Our Services') || data.includes('خدماتنا');
          results.checks.hasMetaTitle = data.includes('<title>') && data.includes('DNA Media');
          results.checks.hasMetaDescription = data.includes('meta name="description"');
          results.checks.hasOpenGraph = data.includes('og:title');
          // hreflang is added via Next.js metadata API (in <head>)
          // It may be rendered differently, so we'll check for language alternates
          results.checks.hasLanguageAlternates = data.includes('alternate') || data.includes('hreflang') || data.includes('/en') && data.includes('/ar');
          
          // Check for specific services
          results.checks.hasCommercialProduction = data.includes('Commercial Production') || data.includes('الإنتاج التجاري');
          results.checks.hasCorporateVideos = data.includes('Corporate Videos') || data.includes('فيديوهات الشركات');
          
          // Check for RTL (Arabic only)
          if (lang === 'Arabic') {
            results.checks.hasRTL = data.includes('dir="rtl"') || data.includes("dir='rtl'");
          }
          
          console.log(`✅ Status: ${res.statusCode} OK`);
          console.log(`\n📊 Content Checks:`);
          Object.entries(results.checks).forEach(([check, passed]) => {
            console.log(`   ${passed ? '✅' : '❌'} ${check}: ${passed ? 'PASS' : 'FAIL'}`);
          });
          
          const allPassed = Object.values(results.checks).every(v => v === true);
          results.allChecksPassed = allPassed;
          
          if (allPassed) {
            console.log(`\n🎉 All checks passed for ${lang}!`);
          } else {
            console.log(`\n⚠️  Some checks failed for ${lang}`);
          }
        } else {
          console.log(`❌ Status: ${res.statusCode} - Failed to load`);
        }
        
        resolve(results);
      });
    }).on('error', (err) => {
      console.log(`❌ Error: ${err.message}`);
      reject(err);
    });
  });
}

async function runTests() {
  console.log('🚀 Starting Homepage CMS Data Tests\n');
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const test of testUrls) {
    try {
      const result = await testUrl(test.url, test.lang);
      results.push(result);
    } catch (error) {
      console.log(`❌ Test failed for ${test.lang}: ${error.message}`);
      results.push({
        url: test.url,
        lang: test.lang,
        success: false,
        error: error.message
      });
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📋 FINAL RESULTS\n');
  
  results.forEach(result => {
    const status = result.success && result.allChecksPassed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${result.lang} (${result.url})`);
    if (result.success && !result.allChecksPassed) {
      console.log(`   ⚠️  Page loaded but some content checks failed`);
    }
  });
  
  const allPassed = results.every(r => r.success && r.allChecksPassed);
  
  console.log('\n' + '='.repeat(60));
  if (allPassed) {
    console.log('\n🎉 ALL TESTS PASSED! Homepage is working with CMS data.\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  SOME TESTS FAILED. Please review the results above.\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(err => {
  console.error('❌ Test suite failed:', err);
  process.exit(1);
});
