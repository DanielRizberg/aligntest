using interfaces;
using models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace repositery
{
    public class repositery : IimageRepositery
        
    {
        public repositery(string url)
        {
            this.dataUrl = url;
            this._cache = new List<image>();
        }
        private List<image> _cache;
        private string _dataUrl;
        public List<image> cache { get => _cache; set => _cache = value; }
        public string dataUrl { get => _dataUrl; set => _dataUrl=value; }

        public  void getdata()
        {
            var http = new HttpClient();
           var response = http.GetAsync(dataUrl);
          
            var taskBody =  response.Result.Content.ReadAsStringAsync();
            cache = JsonConvert.DeserializeObject<List<image>>(taskBody.Result);
        }

        public  imageResponse getRandom(imageRequest request)
        {
            if (isCacheEmpty())
            {
                getdata();
            }
          var filtered=  this._cache.Where(x => !request.forbiddenKeys.Contains(x.id));
            var rnd = new Random();
            var randomResult= filtered.OrderBy(x => rnd.NextDouble()).Take(request.numElements).ToList();
            return new imageResponse { images = randomResult };
        }

        public bool isCacheEmpty()
        {
            return cache.Count == 0;
        }
    }
}
