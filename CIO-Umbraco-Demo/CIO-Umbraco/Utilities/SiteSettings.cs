using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace CIO_Umbraco.Utilities;

public interface ISiteSettingsAccessor
{
    //SiteSettings? Get();
}

public sealed class SiteSettingsAccessor(UmbracoHelper umbracoHelper) : ISiteSettingsAccessor
{
   //public SiteSettings? Get()
   // {
        
   //     return umbracoHelper
   //         .ContentAtRoot()
   //         .SelectMany(x => x.DescendantsOrSelf<SiteSettings>())
   //         .FirstOrDefault();
   // }
}

