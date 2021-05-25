<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <toast :message="message" :show="show"/>
    <div class="content">
      <tab-menu 
        :categories="categories"
        @selectItem="selectItem" />

      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category 
            :subcategories="showSubcategory" 
          />
          <!-- '综合', '新品', '销量' -->
          <tab-control 
            :titles="['全部']"
            @itemClick="tabClick" 
          />
          <tab-content-detail 
            :category-detail="showCategoryDetail" 
          />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabControl from 'components/content/TabControl/TabControl'
  import Scroll from 'components/common/bscroll/Bscroll'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'
  import Toast from "components/common/toast/Toast"

  import {
    getCategory, 
    getSubcategory, 
    getCategoryDetail
  } from "network/category_request.js";
  import {POP, SELL, NEW} from "@/common/const";
  import {tabControlMixin} from "@/common/mixin";

  export default {
		name: "Category",
    components: {
		  NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail,
      Toast
    },
    mixins: [tabControlMixin],
    data() {
		  return {
        // 菜单
		    categories: [],
        // 菜单对应的数据
        categoryData: {
        },
        currentIndex: -1,
        message : "",
        show : false
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
		  _getCategory() {
		    getCategory()
        .then(res => {
          console.log(res)
		      // 1.获取分类数据,初始化左侧菜单栏
		      this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
        .catch(rec => {
          this.show = true
          this.message = "网络异常"
          setTimeout( () => {
            this.show = false
          this.message = ""
          }, 2000 , )
        })
      },
      // 请求上方图片信息
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          // this._getCategoryDetail(SELL)
          // this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res.data.goods
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        // 参数为index
        this._getSubcategories(0)
      }
    }
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
