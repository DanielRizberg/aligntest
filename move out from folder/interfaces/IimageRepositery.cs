using models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace interfaces
{
    public interface IimageRepositery
    {
         string dataUrl { get; set; }
        List<image> cache { get; set; }
        bool isCacheEmpty();
        imageResponse getRandom(imageRequest request);

        void getdata();

    }
}
