<script>

    import { goto } from '$app/navigation';
    import { selectedProduct } from '../../stores';

	import photoFirstSet from '$lib/images/set_1.png';
	import photoSecondSet from '$lib/images/set_2.png';
	import photoThirdSet from '$lib/images/set_3.png';

    

	const prices = {
		firstSet: {
            id: '36',
            count: '1',
			price: '1690',
			noDiscount: '2190'
		},
		secondSet: {
            id: '37',
            count: '3',
			price: '3590',
			noDiscount: '5070'
		},
		thirdSet: {
            id: '38',
            count: '5',
			price: '4990',
			noDiscount: '8450'
		}
	};



    function selectProduct(product) {
        selectedProduct.set(product);
        goto('/checkout');
    }
</script>

<section id="pricing" class="pricing section">
	<!-- Section Title -->
	<div class="container section-title" data-aos="fade-up">
		<h2>รายการสินค้า</h2>
		<div><span class="description-title">โปรโมชั่นพิเศษ</span></div>
	</div>
	<!-- End Section Title -->

	<div class="container">
		<div class="row gy-4">
			<div class="col-lg-4" data-aos="zoom-in" data-aos-delay="100">
				<div class="pricing-item">
					<h3>1 กล่อง</h3>
					<div class="d-flex justify-content-center align-items-center flex-column">
						<h5 class="info">30-day supply</h5>
						<h4><sup>฿</sup>{prices.firstSet.price}<span> / กล่อง</span></h4>
						<img src={photoFirstSet} class="mx-auto d-block" alt="alt" style="width: 200px;" />
						<button on:click={() => selectProduct(prices.firstSet)} class="cta-btn">สั่งซื้อ</button>
					</div>
                    <div class="text-center">

                        <p class="secondary"><s>{prices.firstSet.noDiscount}</s></p>
						<p class="h3"><span class="badge bg-danger">{prices.firstSet.price}</span></p>
                    </div>
				</div>
			</div>
			<div class="col-lg-4" data-aos="zoom-in" data-aos-delay="200">
				<div class="pricing-item featured">
					<p class="popular">ขายดี</p>
					<h3>3 กล่อง</h3>
					<div class="d-flex justify-content-center align-items-center flex-column">
						<h5 class="info">90-day supply</h5>
						<h4><sup>฿</sup>{prices.secondSet.price}<span> / กล่อง</span></h4>
						<img src={photoSecondSet} class="mx-auto d-block" alt="alt" style="width: 200px;" />
						<button on:click={() => selectProduct(prices.secondSet)} class="cta-btn">สั่งซื้อ</button>
					</div>

					<ul>
						<li><i class="bi bi-check"></i> <span>{prices.secondSet.price}</span></li>
						<li class="na"><i class="bi bi-x"></i> <span>{prices.secondSet.noDiscount}</span></li>
					</ul>
				</div>
			</div>
			<div class="col-lg-4" data-aos="zoom-in" data-aos-delay="300">
				<div class="pricing-item">
					<h3>5 กล่อง</h3>
					<div class="d-flex justify-content-center align-items-center flex-column">
						<h5 class="info">180-day supply</h5>
						<h4><sup>฿</sup>{prices.thirdSet.price}<span> / กล่อง</span></h4>
						<img src={photoThirdSet} class="mx-auto d-block" alt="alt" style="width: 200px;" />
						<button on:click={() => selectProduct(prices.thirdSet)} class="cta-btn">สั่งซื้อ</button>
					</div>

					<ul>
						<li><i class="bi bi-check"></i> <span>{prices.thirdSet.price}</span></li>
						<li class="na"><i class="bi bi-x"></i> <span>{prices.thirdSet.noDiscount}</span></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
</style>
