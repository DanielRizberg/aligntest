using interfaces;
using Microsoft.AspNetCore.Mvc;
using models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _3._1ng9Template.Controllers
{
    [ApiController]
    [Route("image")]
    public class ImageController : ControllerBase

    {
        IimageRepositery _repositery;
        public ImageController(IimageRepositery repositery)
        {
            _repositery = repositery;
        }
        [HttpPost]
        [Route("getRandom")]
        public   imageResponse post(imageRequest req)
        {
            imageResponse result = _repositery.getRandom(req);
            return result;
        }
    }
}
